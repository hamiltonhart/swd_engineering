import json
from django.contrib.auth import get_user_model

from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase
from graphql_jwt.shortcuts import get_token
from swd_engineering_project.schema import schema

from .models import RentalDrive

class ContactQueryTestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create(username='test', email='test@email.com', password='test')
        self.token = get_token(self.user)

        self.drive_a = RentalDrive.objects.create(drive_number='100', drive_capacity_gb='1TB')
        self.drive_b = RentalDrive.objects.create(drive_number='101', drive_capacity_gb='2TB')

    def test_drives_query(self):
        nonauth_response = self.query(
            '''
            {
                drives{
                    driveNumber
                    driveCapacityGb
                }
            }
            ''',
            op_name='drives'
        )


        auth_response = self.query(
            '''
            {
                drives{
                    driveNumber
                    driveCapacityGb
                }
            }
            ''',
            op_name='drives',
            headers={'HTTP_AUTHORIZATION': f'JWT {self.token}'}
        )

        self.assertResponseHasErrors(nonauth_response)
        self.assertResponseNoErrors(auth_response)
    
    def test_drive_query(self):
        nonauth_response = self.query(
            '''
            {
                drive(id:1){
                    id
                    driveNumber
                    driveCapacityGb
                }
            }
            ''',
            op_name='drive'
        )

        auth_response = self.query(
            '''
            {
                drive(id:1){
                    id
                    driveNumber
                    driveCapacityGb
                }
            }
            ''',
            op_name='drive',
            headers={'HTTP_AUTHORIZATION': f'JWT {self.token}'}
        )

        self.assertResponseHasErrors(nonauth_response)
        self.assertResponseNoErrors(auth_response)
        self.assertTrue(json.loads(auth_response.content)['data']['drive']['driveNumber'] == 100)

    def test_create_drive_mut(self):
        response = self.query(
            '''
            mutation {
                createDrive(driveNumber:102, driveCapacityGb:"2TB"){
                    drive {
                        id
                        driveNumber
                        driveCapacityGb
                    }
                }
            }
            ''',
            op_name='drive',
            headers={'HTTP_AUTHORIZATION': f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)
        self.assertTrue(json.loads(response.content)['data']['createDrive']['drive']['driveNumber'] == 102)
    
    def test_update_drive_mut(self):
        response = self.query(
            '''
            mutation {
                updateDrive(id:1, driveNumber:106){
                    drive {
                        id
                        driveNumber
                        driveCapacityGb
                    }
                }
            }
            ''',
            op_name='drive',
            headers={'HTTP_AUTHORIZATION': f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)
        self.assertTrue(json.loads(response.content)['data']['updateDrive']['drive']['driveNumber'] == 106)
    
    def test_delete_drive_mut(self):
        response = self.query(
            '''
            mutation {
                deleteDrive(id:1){
                    drive {
                        driveNumber
                        driveCapacityGb
                    }
                }
            }
            ''',
            op_name='drive',
            headers={'HTTP_AUTHORIZATION': f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)