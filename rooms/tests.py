import json
from django.contrib.auth import get_user_model

from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase
from graphql_jwt.shortcuts import get_token
from swd_engineering_project.schema import schema

from .models import Stage

class StageQueryTestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    
    def setUp(self):
        self.user = get_user_model().objects.create(username='test', email='test@email.com', password='test')
        self.token = get_token(self.user)

        self.stage_a = Stage.objects.create(name="Stage A", notes="No Notes", media_shuttle_connection_ip="10.254.129.251", media_shuttle_subnet="255.255.255.240", media_shuttle_host="10.254.129.1", media_shuttle_ip_range=".2 - .10")
        self.stage_a = Stage.objects.create(name="Stage B", notes="No Notes", media_shuttle_connection_ip="10.254.129.251", media_shuttle_subnet="255.255.255.240", media_shuttle_host="10.254.129.11", media_shuttle_ip_range=".12 - .20")

    def test_stages_query(self):
        response = self.query(
            '''
            {
                stages{
                    id
                    name
                    notes
                    mediaShuttleConnectionIp
                    mediaShuttleSubnet
                    mediaShuttleHost
                    mediaShuttleIpRange
                }
            }
            ''',
            op_name='stages',
            headers={'HTTP_AUTHORIZATION':f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)

    def test_stage_query(self):
        response = self.query(
            '''
            {
                stage(id:1){
                    id
                    name
                    notes
                }
            }
            ''',
            op_name='stage',
            headers={'HTTP_AUTHORIZATION':f'JWT {self.token}'}
        )

        self.assertResponseNoErrors(response)
        self.assertTrue(json.loads(response.content)['data']['stage']['name'] == "Stage A")