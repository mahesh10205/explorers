const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const expect = chai.expect;

let server = require('../server');

let should = chai.should();
chai.use(chaiHttp);


describe('Alert Server', () => {
  beforeEach(() => {

    nock('http://test:80')
      .get('/prometheus-dashboard/api/v1/query?query=ALERTS')
      .reply(200, {
        "status": "success",
        "data": {
          "resultType": "vector",
          "result": [
            {
              "metric": {
                "__name__": "ALERTS",
                "alertname": "ApplicationOrServiceFailure",
                "alertstate": "firing",
                "beta_kubernetes_io_arch": "amd64",
                "beta_kubernetes_io_instance_type": "9cd822ba-947b-4a59-92bc-a9f3a98d5d15",
                "beta_kubernetes_io_os": "linux",
                "failure_domain_beta_kubernetes_io_region": "RegionOne",
                "failure_domain_beta_kubernetes_io_zone": "nova",
                "instance": "k8s-master-0",
                "job": "kubernetes-nodes-cadvisor",
                "kubernetes_io_hostname": "k8s-master-0",
                "node_role_kubernetes_io_master": "true",
                "severity": "Critical"
              },
              "value": [
                1529113427.253,
                "1"
              ]
            }
          ]
        }
      });

    nock('http://test:80')
      .get('/api/v1/alerts')
      .reply(200, {
        "status": "success",
        "data": [
          {
            "labels": {
              "alertname": "ApplicationOrServiceFailure",
              "severity": "Critical"
            },
            "annotations": {
              "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
            },
          }
        ]
      });

  });


  describe('/GET Cache', () => {
    it('Clear Cache', (done) => {
      chai.request(server)
        .get('/clear/cache')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');

          res.body.should.have.property('status').eql('success');

          done();
        });
    });
  });

  describe('/alerts', () => {
    it(' Test Case for getAlerts success scenario', (done) => {
      chai.request(server).get('/alerts')
        .end((err, res) => {
          console.log(res.body);

          // should.not.exist(err);
          // res.status.should.equal(200);

          expect(res.status).to.be.equal(200);
          expect(err).to.be.null;

          expect(res.body.success).to.be.equal(true);
          expect(res.body.data).to.be.a('array');

          done();
        });
    });
  });
});