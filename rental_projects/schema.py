import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from django.db.models import Q

from graphql_jwt.decorators import login_required

from .models import RentalProject

from project_rooms.schema import ProjectRoomType


# Queries

class RentalProjectType(DjangoObjectType):
    is_mixing_complete = graphene.Boolean()
    is_project_complete = graphene.Boolean()
    total_storage = graphene.String()
    total_drives = graphene.Int()
    primary_room = graphene.Field(ProjectRoomType)

    class Meta:
        model = RentalProject
        convert_choices_to_enum = True
        exclude = ('number_of_systems',)


class Query(graphene.ObjectType):
    rental_projects = graphene.List(
        RentalProjectType, search=graphene.String(), main_filter=graphene.String())
    rental_project = graphene.Field(
        RentalProjectType, id=graphene.Int(required=True))
    current_projects = graphene.List(RentalProjectType)
    mixing_completed_projects = graphene.List(RentalProjectType)
    completed_projects = graphene.List(RentalProjectType)

    # @login_required
    def resolve_rental_projects(self, info, search=None):

        if search:
            filter = (
                Q(title__icontains=search) |
                Q(abbreviation__icontains=search) |
                Q(drive_user__icontains=search) |
                Q(ms_user__icontains=search)
            )
            return RentalProject.objects.filter(filter).order_by('title')
        else:
            return RentalProject.objects.all().order_by('title')

    @login_required
    def resolve_current_projects(self, info):
        return RentalProject.objects.current()

    @login_required
    def resolve_mixing_completed_projects(self, info):
        return RentalProject.objects.mixing_complete()

    @login_required
    def resolve_completed_projects(self, info):
        return RentalProject.objects.project_complete()

    # @login_required
    def resolve_rental_project(self, info, id):
        try:
            rental_project = RentalProject.objects.get(id=id)
            return rental_project
        except:
            raise GraphQLError("Rental Project could not be found.")


# Mutations

class CreateRentalProject(graphene.Mutation):
    project = graphene.Field(RentalProjectType)

    class Arguments:
        title = graphene.String(required=True)
        abbreviation = graphene.String(required=True)
        season = graphene.Int()
        protools_vers = graphene.String(required=True)
        drive_user = graphene.String()
        drive_pass = graphene.String()
        ms_user = graphene.String()
        ms_pass = graphene.String()
        files_link = graphene.String(required=True)
        channel_config = graphene.String(required=True)
        additional_info = graphene.String()
        start_date = graphene.types.datetime.Date()

    # @login_required
    def mutate(self, info, title, abbreviation, protools_vers, files_link, channel_config, **kwargs):
        project = RentalProject(
            title=title,
            abbreviation=abbreviation,
            protools_vers=protools_vers,
            files_link=files_link,
            channel_config=channel_config,
            **kwargs
        )

        project.save()

        return CreateRentalProject(project=project)


class UpdateRentalProject(graphene.Mutation):
    project = graphene.Field(RentalProjectType)

    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        abbreviation = graphene.String()
        season = graphene.Int()
        protools_vers = graphene.String()
        drive_user = graphene.String()
        drive_pass = graphene.String()
        ms_user = graphene.String()
        ms_pass = graphene.String()
        files_link = graphene.String()
        channel_config = graphene.String()
        additional_info = graphene.String()
        start_date = graphene.types.datetime.Date()
        mixing_complete_date = graphene.types.datetime.Date()
        project_complete_date = graphene.types.datetime.Date()

    @login_required
    def mutate(self, info, id, **kwargs):
        try:
            project = RentalProject.objects.get(id=id)
        except:
            raise GraphQLError("Not a valid ID")

        if kwargs.get('title'):
            project.title = kwargs.get('title')
        if kwargs.get('abbreviation'):
            project.abbreviation = kwargs.get('abbreviation')
        if kwargs.get('protools_vers'):
            project.protools_vers = kwargs.get('protools_vers')
        if kwargs.get('files_link'):
            project.files_link = kwargs.get('files_link')
        if kwargs.get('channel_config'):
            project.channel_config = kwargs.get('channel_config')
        if kwargs.get('season'):
            project.season = kwargs.get('season')
        if kwargs.get('drive_user'):
            project.drive_user = kwargs.get('drive_user')
        if kwargs.get('drive_pass'):
            project.drive_pass = kwargs.get('drive_pass')
        if kwargs.get('ms_user'):
            project.ms_user = kwargs.get('ms_user')
        if kwargs.get('ms_pass'):
            project.ms_pass = kwargs.get('ms_pass')
        if kwargs.get('additional_info'):
            project.additional_info = kwargs.get('additional_info')
        if kwargs.get('start_date'):
            project.start_date = kwargs.get('start_date')
        if kwargs.get('mixing_complete_date'):
            project.mixing_complete_date = kwargs.get('mixing_complete_date')
        if kwargs.get('project_complete_date'):
            project.project_complete_date = kwargs.get('project_complete_date')

        project.save()

        return CreateRentalProject(project=project)


class DeleteRentalProject(graphene.Mutation):
    project_id = graphene.Int()

    class Arguments:
        project_id = graphene.Int(required=True)

    # @login_required
    def mutate(self, info, project_id):
        try:
            project = RentalProject.objects.get(id=project_id)

            project.delete()
            return DeleteRentalProject(project_id=project_id)
        except:
            raise GraphQLError("Not a valid ID")


class MarkProjectComplete(graphene.Mutation):
    project = graphene.Field(RentalProjectType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Must be logged in.")
        try:
            project = RentalProject.objects.get(id=id)
        except:
            raise GraphQLError("Not a valid ID")

        project.backup(user)
        return MarkProjectComplete(project=project)


class MarkMixingComplete(graphene.Mutation):
    project = graphene.Field(RentalProjectType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Must be logged in to mark as mixing complete.")

        try:
            project = RentalProject.objects.get(id=id)

        except:
            raise GraphQLError("Rental Project could not be found.")

        project.mixing_completed(user)
        return MarkMixingComplete(project=project)


class MarkIncomplete(graphene.Mutation):
    project = graphene.Field(RentalProjectType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Must be logged in to mark incomplete.")

        try:
            project = RentalProject.objects.get(id=id)
        except:
            raise GraphQLError("Rental Project could not be found.")

        project.mixing_incomplete()
        return MarkMixingComplete(project=project)


class SetPrimaryRoom(graphene.Mutation):
    project = graphene.Field(RentalProjectType)

    class Arguments:
        project_id = graphene.Int(required=True)
        primary_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, project_id, primary_id):
        try:
            project = RentalProject.objects.get(id=project_id)
        except:
            raise GraphQLError(
                f'{project_id} is not a valid Rental Project ID')

        project.set_primary_room(primary_id)
        return SetPrimaryRoom(project=project)


class UnsetPrimaryRoom(graphene.Mutation):
    project = graphene.Field(RentalProjectType)

    class Arguments:
        project_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, project_id):
        try:
            project = RentalProject.objects.get(id=project_id)
        except:
            raise GraphQLError(
                f'{project_id} is not a valid Rental Project ID')

        project.unset_primary_room()
        return SetPrimaryRoom(project=project)


class Mutation(graphene.ObjectType):
    create_rental_project = CreateRentalProject.Field()
    update_rental_project = UpdateRentalProject.Field()
    delete_rental_project = DeleteRentalProject.Field()
    mark_project_complete = MarkProjectComplete.Field()
    mark_mixing_complete = MarkMixingComplete.Field()
    mark_incomplete = MarkIncomplete.Field()
    set_primary_room = SetPrimaryRoom.Field()
    unset_primary_room = UnsetPrimaryRoom.Field()
