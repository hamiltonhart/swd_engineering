import graphene
import graphql_jwt
from graphene_django import DjangoObjectType

# import app schemas
import harddrives.schema
import project_drives.schema
import rental_projects.schema
import contacts.schema
import project_rooms.schema
import rooms.schema
import project_clients.schema
import users.schema

# from project_clients.models import ClientMediaShuttle

# class ClientMSType(DjangoObjectType):
#     class Meta:
#         model = ClientMediaShuttle


class Query(
    users.schema.Query,
    rental_projects.schema.Query,
    contacts.schema.Query,
    harddrives.schema.Query,
    rooms.schema.Query,
    project_rooms.schema.Query,
    project_drives.schema.Query,
    project_clients.schema.Query,
    graphene.ObjectType
):
    pass


class Mutation(
    users.schema.Mutation,
    rental_projects.schema.Mutation,
    contacts.schema.Mutation,
    rooms.schema.Mutation,
    harddrives.schema.Mutation,
    project_clients.schema.Mutation,
    project_drives.schema.Mutation,
    project_rooms.schema.Mutation,
    graphene.ObjectType
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
