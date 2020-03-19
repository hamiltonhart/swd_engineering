import json
from django.contrib.auth import get_user_model

from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase
from graphql_jwt.shortcuts import get_token
from swd_engineering_project.schema import schema

from .models import Contact


class ContactQueryTestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create(username='test', email='test@email.com', password='test')
        self.token = get_token(self.user)

        self.contact_a = Contact.objects.create(first_name="George",last_name="Hart", email="george@email.com", phone_number="8187487214", title="Engineer", company="Deluxe", notes="No Notes")
        self.contact_b = Contact.objects.create(first_name="Sam",last_name="Iorio", email="sam@email.com", phone_number="7147053597", title="Stage Engineer", company="Co3", notes="Here are some notes")

    def test_contacts_auth_query(self):
        response = self.query(
            '''
            query {
                contacts {
                    id
                }
            }
            ''',
            op_name="contacts",
            headers={'HTTP_AUTHORIZATION':f'JWT {self.token}'}
        )

        # content = json.loads(response.content)
        # print(json.dumps(content, indent=2))

        self.assertResponseNoErrors(response)

    def test_contacts_nonauth_query(self):
        response = self.query(
            '''
            query {
                contacts {
                    id
                }
            }
            ''',
            op_name="contacts"
        )

        self.assertResponseHasErrors(response)

    def test_contact_auth_query(self):
        response = self.query(
            '''
            query {
                contact(id:1){
                    id
                    name
                }
            }
            ''',
            op_name='contact',
            headers={'HTTP_AUTHORIZATION': f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)
        self.assertTrue(json.loads(response.content)['data']['contact']['name'] == 'George Hart')
    
    def test_contact_nonauth_query(self):
        response = self.query(
            '''
            query {
                contact(id:1){
                    id
                    name
                }
            }
            ''',
            op_name='contact'
        )

        self.assertResponseHasErrors(response)

    def test_contact_create_mut(self):
        response = self.query(
            '''
            mutation {
                createContact(firstName: "Joseph", lastName: "Schmo", email: "josephschmo@email.com", phoneNumber: "5555555555", title: "Engineer", company: "Deluxe", notes: "No Notes") {
                    contact{
                        id
                        firstName
                        lastName
                        email
                        phoneNumber
                        country
                        company
                        title
                        notes
                        name 
                    }
                }
            }
            ''',
            op_name='contact',
            headers={"HTTP_AUTHORIZATION": f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)
        self.assertTrue(json.loads(response.content)['data']['createContact']['contact']['name'] == 'Joseph Schmo')
    
    def test_contact_delete_mut(self):
        response = self.query(
            '''
            mutation {
                updateContact(id:1, firstName: "NewGuy") {
                    contact{
                        name 
                    }
                }
            }
            ''',
            op_name='contact',
            headers={"HTTP_AUTHORIZATION": f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)
        self.assertTrue(json.loads(response.content)['data']['updateContact']['contact']['name'] == 'NewGuy Hart')
    
    def test_contact_update_mut(self):
        response = self.query(
            '''
            mutation {
                deleteContact(id:1) {
                    contact{
                        name 
                    }
                }
            }
            ''',
            op_name='contact',
            headers={"HTTP_AUTHORIZATION": f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)