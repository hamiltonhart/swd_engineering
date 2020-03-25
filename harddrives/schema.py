import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from functools import reduce

from .models import RentalDrive
from rental_projects.schema import RentalProjectType

# Queries


class DriveType(DjangoObjectType):
    current_project = graphene.Field(RentalProjectType)

    class Meta:
        model = RentalDrive
        convert_choices_to_enum = False


class DriveTotalType(graphene.ObjectType):
    count = graphene.Int()
    capacity = graphene.Int()


class DrivesAvailableType(graphene.ObjectType):
    two_fifty_available = graphene.Int()
    five_hundred_available = graphene.Int()
    one_tb_available = graphene.Int()
    two_tb_available = graphene.Int()


class DrivesUnavailableType(graphene.ObjectType):
    two_fifty_unavailable = graphene.Int()
    five_hundred_unavailable = graphene.Int()
    one_tb_unavailable = graphene.Int()
    two_tb_unavailable = graphene.Int()


class Query(graphene.ObjectType):
    drives = graphene.List(DriveType, capacity=graphene.String())
    drive = graphene.Field(DriveType, id=graphene.Int(required=True))
    available_drives = graphene.List(DriveType)
    total_drives = graphene.Field(DriveTotalType)
    drives_available = graphene.Field(DrivesAvailableType)
    drive_unavailable = graphene.Field(DrivesUnavailableType)
    last_drive = graphene.Field(DriveType)

    @login_required
    def resolve_drives(self, info, capacity=None):
        if capacity:
            return RentalDrive.objects.filter(drive_capacity_gb=capacity)
        else:
            return RentalDrive.objects.all()

    @login_required
    def resolve_drive(self, info, id):
        try:
            return RentalDrive.objects.get(id=id)
        except:
            raise GraphQLError(f"{id} is not a valid Drive ID")

    @login_required
    def resolve_available_drives(self, info):
        return RentalDrive.objects.available()

    @login_required
    def resolve_total_drives(self, info):
        drives = RentalDrive.objects.all()
        count = len(drives)
        tb_total = []
        gb_total = []
        for drive in drives:
            if drive.drive_capacity_gb.endswith('TB'):
                tb_total.append(int(drive.drive_capacity_gb.strip('TB')))
            else:
                gb_total.append(
                    int(drive.drive_capacity_gb.strip('GB')) / 1000)
        if len(tb_total) > 0:
            tb_total = reduce(lambda a, b: a + b, tb_total)
        else:
            tb_total = 0
        if len(gb_total) > 0:
            gb_total = reduce(lambda a, b: a + b, gb_total)
            capacity = tb_total + gb_total
        else:
            capacity = tb_total
        return DriveTotalType(count=count, capacity=capacity)

    @login_required
    def resolve_drives_available(self, info):
        two_fifty = len(RentalDrive.objects.twofifty_available())
        five_hundred = len(RentalDrive.objects.fivehundred_available())
        one_tb = len(RentalDrive.objects.onetb_available())
        two_tb = len(RentalDrive.objects.twotb_available())

        return DrivesAvailableType(two_fifty_available=two_fifty, five_hundred_available=five_hundred, one_tb_available=one_tb, two_tb_available=two_tb)

    @login_required
    def resolve_drives_unavailable(self, info):
        two_fifty = len(RentalDrive.objects.twofifty_unavailable())
        five_hundred = len(RentalDrive.objects.fivehundred_unavailable())
        one_tb = len(RentalDrive.objects.onetb_unavailable())
        two_tb = len(RentalDrive.objects.twotb_unavailable())

        return DrivesUnavailableType(two_fifty_unavailable=two_fifty, five_hundred_unavailable=five_hundred, one_tb_unavailable=one_tb, two_tb_unavailable=two_tb)

    @login_required
    def resolve_last_drive(self, info):
        return RentalDrive.objects.order_by("-drive_number")[0]


# Mutations


class CreateDrive(graphene.Mutation):
    drives = graphene.List(DriveType)

    class Arguments:
        drive_number = graphene.Int(required=True)
        drive_capacity_gb = graphene.String(required=True)
        number_of_drives = graphene.Int()

    @login_required
    def mutate(self, info, drive_number, drive_capacity_gb, number_of_drives):
        created_drives = []
        while number_of_drives != 0:
            drive = RentalDrive.objects.create(
                drive_number=drive_number, drive_capacity_gb=drive_capacity_gb)
            created_drives.append(drive)
            number_of_drives = number_of_drives - 1
            drive_number = drive_number + 1
        return CreateDrive(drives=created_drives)


class UpdateDrive(graphene.Mutation):
    drive = graphene.Field(DriveType)

    class Arguments:
        id = graphene.Int(required=True)
        drive_number = graphene.Int()
        drive_capacity_gb = graphene.String()

    @login_required
    def mutate(self, info, id, drive_number=None, drive_capacity_gb=None):
        try:
            drive = RentalDrive.objects.get(id=id)
        except:
            raise GraphQLError("Not a valid Drive ID")

        if drive_number:
            drive.drive_number = drive_number
        if drive_capacity_gb:
            drive.drive_capacity_gb = drive_capacity_gb
        drive.save()
        return UpdateDrive(drive=drive)


class DeleteDrive(graphene.Mutation):
    drive_id = graphene.Int()

    class Arguments:
        drive_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, drive_id):
        try:
            drive = RentalDrive.objects.get(id=drive_id)
        except:
            raise GraphQLError("Not a valid Drive ID")

        drive.delete()
        return DeleteDrive(drive_id=drive_id)


class ReleaseDrive(graphene.Mutation):
    drive_id = graphene.Int()

    class Arguments:
        drive_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, drive_id):
        try:
            drive = RentalDrive.objects.get(id=drive_id)
            drive.rental_projects.all()[0].delete()
            # drive.rentals_drives[0].delete()
        except:
            raise GraphQLError("A valid Drive ID was not supplied.")

        return ReleaseDrive(drive_id=drive_id)


class Mutation(graphene.ObjectType):
    create_drive = CreateDrive.Field()
    update_drive = UpdateDrive.Field()
    delete_drive = DeleteDrive.Field()
    release_drive = ReleaseDrive.Field()
