import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import Contact

from rental_projects.schema import RentalProjectType

import re


# Queries

class ContactType(DjangoObjectType):
    last_project = graphene.Field(RentalProjectType)
    name = graphene.String()

    class Meta:
        model = Contact


class Query(graphene.ObjectType):
    contacts = graphene.List(
        ContactType, limit=graphene.Int(), reverse=graphene.Boolean())
    contact = graphene.Field(ContactType, id=graphene.Int(required=True))

    @login_required
    def resolve_contacts(self, info, limit=None, reverse=None):
        if reverse:
            contacts = Contact.objects.order_by('-pk')
        else:
            contacts = Contact.objects.all()

        if limit:
            return contacts[:limit]
        else:
            return contacts

    @login_required
    def resolve_contact(self, info, id):
        try:
            return Contact.objects.get(id=id)
        except:
            raise GraphQLError("Not a valid Contact ID")


# Mutations

class CreateContact(graphene.Mutation):
    contact = graphene.Field(ContactType)

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String()
        phone_number = graphene.String()
        country = graphene.String()
        company = graphene.String()
        title = graphene.String()
        notes = graphene.String()

    @login_required
    def mutate(self, info, first_name, last_name, **kwargs):
        contact = Contact(first_name=first_name, last_name=last_name, **kwargs)
        contact.save()
        return CreateContact(contact=contact)


class UpdateContact(graphene.Mutation):
    contact = graphene.Field(ContactType)

    class Arguments:
        id = graphene.Int(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        phone_number = graphene.String()
        country = graphene.String()
        company = graphene.String()
        title = graphene.String()
        notes = graphene.String()

    @login_required
    def mutate(self, info, id, **kwargs):
        try:
            contact = Contact.objects.get(id=id)
        except:
            raise GraphQLError("Not a valid Contact ID")

        if kwargs.get('first_name'):
            contact.first_name = kwargs.get('first_name')
        if kwargs.get('last_name'):
            contact.last_name = kwargs.get('last_name')
        if kwargs.get('email'):
            contact.email = kwargs.get('email')
        if kwargs.get('phone_number'):
            contact.phone_number = kwargs.get('phone_number')
        if kwargs.get('country'):
            contact.country = kwargs.get('country')
        if kwargs.get('company'):
            contact.company = kwargs.get('company')
        if kwargs.get('title'):
            contact.title = kwargs.get('title')
        if kwargs.get('notes'):
            contact.notes = kwargs.get('notes')

        contact.save()
        return UpdateContact(contact=contact)


class DeleteContact(graphene.Mutation):
    # contact = graphene.Field(ContactType)
    contact_id = graphene.Int()

    class Arguments:
        contact_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, contact_id):
        try:
            contact = Contact.objects.get(id=contact_id)
        except:
            raise GraphQLError("Not a valid Contact ID")

        contact.delete()
        return DeleteContact(contact_id=contact_id)


class Mutation(graphene.ObjectType):
    create_contact = CreateContact.Field()
    update_contact = UpdateContact.Field()
    delete_contact = DeleteContact.Field()
