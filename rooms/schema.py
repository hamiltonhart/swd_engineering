import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import Room, Stage

# Queries

class RoomType(DjangoObjectType):
    class Meta:
        model = Room

class StageType(DjangoObjectType):
    class Meta:
        model = Stage

class Query(graphene.ObjectType):
    stages = graphene.List(StageType)
    stage = graphene.Field(StageType, id=graphene.Int(required=True))
    
    @login_required
    def resolve_stages(self, info):
        return Stage.objects.all().order_by("name")

    @login_required
    def resolve_stage(self, info, id):
        return Stage.objects.get(id=id)


# Mutations

class CreateStage(graphene.Mutation):
    stage = graphene.Field(StageType)

    class Arguments:
        name = graphene.String(required=True)
        notes = graphene.String()
        media_shuttle_connection_ip = graphene.String()
        media_shuttle_subnet = graphene.String()
        media_shuttle_host = graphene.String()
        media_shuttle_ip_range = graphene.String()

    @login_required
    def mutate(self, info, name, media_shuttle_connection_ip="smb://10.254.129.251", media_shuttle_subnet="255.255.255.240", media_shuttle_host=None, media_shuttle_ip_range=None, notes=None):
        stage =  Stage(
            name=name, 
            notes=notes, 
            media_shuttle_connection_ip=media_shuttle_connection_ip,
            media_shuttle_host=media_shuttle_host,
            media_shuttle_ip_range=media_shuttle_ip_range,
            media_shuttle_subnet=media_shuttle_subnet
            )

        return CreateStage(stage=stage)

class UpdateStage(graphene.Mutation):
    stage = graphene.Field(StageType)

    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        notes = graphene.String()
        media_shuttle_connection_ip = graphene.String()
        media_shuttle_subnet = graphene.String()
        media_shuttle_host = graphene.String()
        media_shuttle_ip_range = graphene.String()

    @login_required
    def mutate(self, info, id, name=None, media_shuttle_connection_ip=None, media_shuttle_subnet=None, media_shuttle_host=None, media_shuttle_ip_range=None, notes=None):
        try:
            stage = Stage.objects.get(id=id)
        except:
            raise GraphQLError("Not a valid stage ID")

        if name:
            stage.name = name
        if media_shuttle_connection_ip:
            stage.media_shuttle_connection_ip = media_shuttle_connection_ip
        if media_shuttle_host:
            stage.media_shuttle_host = media_shuttle_host
        if media_shuttle_subnet:
            stage.media_shuttle_subnet = media_shuttle_subnet
        if media_shuttle_ip_range:
            stage.media_shuttle_ip_range = media_shuttle_ip_range
        if notes:
            stage.notes = notes

        stage.save()

        return CreateStage(stage=stage)

class DeleteStage(graphene.Mutation):
    stage = graphene.Field(StageType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            stage = Stage.objects.get(id=id)
        except:
            raise GraphQLError("ID does not exist")

        stage.delete()

        return DeleteStage(stage=stage)


class Mutation(graphene.ObjectType):
    create_stage = CreateStage.Field()
    update_stage = UpdateStage.Field()
    delete_stage = DeleteStage.Field()