import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import ProjectDrive
from rental_projects.models import RentalProject
from harddrives.models import RentalDrive

# Queries

class ProjectDriveType(DjangoObjectType):
    class Meta:
        model = ProjectDrive

class Query(graphene.ObjectType):
    pass
    # project_drives = graphene.List(ProjectDriveType)

    # def resolve_project_drives(self, info):
    #     return ProjectDrive.objects.all()

# Mutations

class CreateProjectDrive(graphene.Mutation):
    project_drive = graphene.Field(ProjectDriveType)

    class Arguments:
        project_id = graphene.Int(required=True)
        drive_id = graphene.Int(required=True)
        notes = graphene.String()

    @login_required
    def mutate(self, info, project_id, drive_id, notes=None):
        try:
            project = RentalProject.objects.get(id=project_id)
        except:
            raise GraphQLError(f"{project_id} is not a valid Project ID")

        try:
            drive = RentalDrive.objects.get(id=drive_id)
        except:
            raise GraphQLError(f"{drive_id} is not a valid Drive ID")

        project_drive = ProjectDrive(project=project, drive=drive)
        if notes:
            project_drive.notes = notes
        project_drive.save()
        return CreateProjectDrive(project_drive=project_drive)

class UpdateProjectDrive(graphene.Mutation):
    project_drive = graphene.Field(ProjectDriveType)

    class Arguments:
        id = graphene.Int(required=True)
        notes = graphene.String()

    @login_required
    def mutate(self, info, id, notes=None):
        try:
            project_drive = ProjectDrive.objects.get(id=id)
        except:
            raise GraphQLError(f"{id} is not a valid Project Drive ID")

        if notes:
            project_drive.notes = notes
        project_drive.save()
        return UpdateProjectDrive(project_drive=project_drive)

class DeleteProjectDrive(graphene.Mutation):
    project_drive = graphene.Field(ProjectDriveType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            project_drive = ProjectDrive.objects.get(id=id)
        except:
            raise GraphQLError(f"{id} is not a valid Project Drive ID")

        project_drive.delete()
        return UpdateProjectDrive(project_drive=project_drive)


class Mutation(graphene.ObjectType):
    create_project_drive = CreateProjectDrive.Field()
    update_project_drive = UpdateProjectDrive.Field()
    delete_project_drive = DeleteProjectDrive.Field()

