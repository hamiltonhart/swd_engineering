import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from project_rooms.models import ProjectRoom
from rooms.models import Stage
from rental_projects.models import RentalProject


# Queries

class ProjectRoomType(DjangoObjectType):
    class Meta:
        model = ProjectRoom


class Query(graphene.ObjectType):

    primary_room = graphene.Field(
        ProjectRoomType, id=graphene.Int(required=True))
    project_rooms = graphene.List(
        ProjectRoomType, id=graphene.Int(required=True))

    def resolve_primary_room(self, info, id):
        try:
            return ProjectRoom.objects.get(id=id)
        except:
            raise GraphQLError(f"There is no Project Room with the ID {id}.")

    def resolve_project_rooms(self, info, id):
        try:
            return RentalProject.objects.get(id=20).rental_rooms.all()
        except:
            return GraphQLError(f"Could not find a Project with ID {id}.")

# Mutations


class CreateProjectRoom(graphene.Mutation):
    project_room = graphene.Field(ProjectRoomType)

    class Arguments:
        room_id = graphene.Int(required=True)
        project_id = graphene.Int(required=True)
        primary_room = graphene.Boolean()

    @login_required
    def mutate(self, info, room_id, project_id, primary_room=False):
        try:
            room = Stage.objects.get(id=room_id)
        except:
            raise GraphQLError(f'{room_id} is not a valid Room ID')

        try:
            project = RentalProject.objects.get(id=project_id)
        except:
            raise GraphQLError(
                f'{project_id} is not a valid Rental Project ID')

        project_room = ProjectRoom(room=room, project=project)
        project_room.save()
        if primary_room:
            project.set_primary_room(project_room.pk)
        return CreateProjectRoom(project_room=project_room)


class DeleteProjectRoom(graphene.Mutation):
    project_room = graphene.Field(ProjectRoomType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            project_room = ProjectRoom.objects.get(id=id)
        except:
            raise GraphQLError(f'{id} is not a valid Project Room ID')

        project_room.delete()
        return DeleteProjectRoom(project_room=project_room)


class Mutation(graphene.ObjectType):
    create_project_room = CreateProjectRoom.Field()
    delete_project_room = DeleteProjectRoom.Field()
