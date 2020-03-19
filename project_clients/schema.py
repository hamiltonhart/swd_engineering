import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import ProjectClient, ClientMediaShuttle
from contacts.models import Contact
from rental_projects.models import RentalProject
from project_rooms.models import ProjectRoom

# Queries


class ProjectClientType(DjangoObjectType):
    class Meta:
        model = ProjectClient


class ClientMediaShuttleType(DjangoObjectType):
    class Meta:
        model = ClientMediaShuttle


class Query(graphene.ObjectType):
    pass
    # project_clients = graphene.List(ProjectClientType)
    # project_client = graphene.Field(
    #     ProjectClientType, id=graphene.Int(required=True))

    # def resolve_project_clients(self, info):
    #     return ProjectClient.objects.all()

    # def resolve_project_client(self, info, id):
    #     try:
    #         return ProjectClient.objects.get(id=id)
    #     except:
    #         raise GraphQLError("Not a valid Project Client ID")


# Mutations

# Project Clients

class CreateProjectClient(graphene.Mutation):
    project_client = graphene.Field(ProjectClientType)

    class Arguments:
        client_id = graphene.Int(required=True)
        project_id = graphene.Int(required=True)
        client_role = graphene.String()
        notes = graphene.String()

    @login_required
    def mutate(self, info, client_id, project_id, **kwargs):
        try:
            client = Contact.objects.get(id=client_id)
        except:
            raise GraphQLError(f'{client_id} is not a valid Contact ID')
        try:
            project = RentalProject.objects.get(id=project_id)
        except:
            raise GraphQLError(
                f"{project_id} is not a valid Rental Project ID")

        project_client = ProjectClient(
            client=client, project=project, **kwargs)
        project_client.save()
        return CreateProjectClient(project_client=project_client)


class UpdateProjectClient(graphene.Mutation):
    project_client = graphene.Field(ProjectClientType)

    class Arguments:
        id = graphene.Int(required=True)

        client_id = graphene.Int()

        project_id = graphene.Int()

        client_role = graphene.String()

        notes = graphene.String()

    @login_required
    def mutate(self, info, id, **kwargs):
        try:
            project_client = ProjectClient.objects.get(id=id)
        except:
            raise GraphQLError(f"{id} is not a valid Project Client ID")

        if kwargs.get('client_id'):
            project_client.client_id = kwargs.get('client_id')
        if kwargs.get('project_id'):
            project_client.project_id = kwargs.get('project_id')
        if kwargs.get('client_role'):
            project_client.client_role = kwargs.get('client_role')
        if kwargs.get('notes'):
            project_client.notes = kwargs.get('notes')
        project_client.save()

        return UpdateProjectClient(project_client=project_client)


class DeleteProjectClient(graphene.Mutation):
    project_client = graphene.Field(ProjectClientType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            project_client = ProjectClient.objects.get(id=id)
        except:
            raise GraphQLError(f"{id} is not a valid Project Client ID")

        project_client.delete()
        return DeleteProjectClient(project_client=project_client)


# Media Shuttle Clients

class CreateMediaShuttleClient(graphene.Mutation):
    ms_client = graphene.Field(ClientMediaShuttleType)

    class Arguments:
        project_client_id = graphene.Int(required=True)
        project_room_id = graphene.Int(required=True)
        project_id = graphene.Int(required=True)
        client_ms = graphene.String(required=True)

    @login_required
    def mutate(self, info, project_client_id, project_room_id, project_id, client_ms):
        try:
            project_client = ProjectClient.objects.get(id=project_client_id)
        except:
            raise GraphQLError(
                f"{project_client_id} is not a valid Project Client ID")
        try:
            project_room = ProjectRoom.objects.get(id=project_room_id)
        except:
            raise GraphQLError(
                f"{project_room_id} is not a valid Project Room ID")
        try:
            project = RentalProject.objects.get(id=project_id)
        except:
            raise GraphQLError(f"{project_id} is not a valid Project ID")

        ms_client = ClientMediaShuttle(
            project_client=project_client, project_room=project_room, project=project, client_ms=client_ms)
        ms_client.save()

        return CreateMediaShuttleClient(ms_client=ms_client)


class UpdateMediaShuttleClient(graphene.Mutation):
    ms_client = graphene.Field(ClientMediaShuttleType)

    class Arguments:
        id = graphene.Int(required=True)
        client_ms = graphene.String()

    @login_required
    def mutate(self, info, id, client_ms=None):
        try:
            ms_client = ClientMediaShuttle.objects.get(id=id)
        except:
            raise GraphQLError(f"{id} is not a valid Media Shuttle Client ID")

        if client_ms:
            ms_client.client_ms = client_ms
        ms_client.save()

        return UpdateMediaShuttleClient(ms_client=ms_client)


class DeleteMediaShuttleClient(graphene.Mutation):
    ms_client = graphene.Field(ClientMediaShuttleType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            ms_client = ClientMediaShuttle.objects.get(id=id)
        except:
            raise GraphQLError(f"{id} is not a valid Media Shuttle Client ID")

        ms_client.delete()
        return DeleteMediaShuttleClient(ms_client=ms_client)


class Mutation(graphene.ObjectType):
    create_project_client = CreateProjectClient.Field()
    update_project_client = UpdateProjectClient.Field()
    delete_project_client = DeleteProjectClient.Field()
    create_media_shuttle_client = CreateMediaShuttleClient.Field()
    update_media_shuttle_client = UpdateMediaShuttleClient.Field()
    delete_media_shuttle_client = DeleteMediaShuttleClient.Field()
