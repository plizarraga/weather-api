var expect = require('chai').expect;
var request = require('superagent');
var assert = require('assert');

var urlAPI = 'http://localhost:5000/api';

describe('Weather API', function(){
	describe('when requested at /wheawter/san diego', function(){
		it('expect city: San Diego', function(done){
			request.get(urlAPI+'/weather/san diego').end(function(err, res){
				expect(res).to.have.property('status', 200);
				expect(res.body.query.results.channel.location.city).to.equal('San Diego');
				done();
			});
		});
	});

	describe('when requested at /restaurants/san diego/italian', function(){
		it('expect 10 restaurants', function(done){
			request.get(urlAPI+'/restaurants/san diego/mexican').end(function(err, res){
				expect(res).to.have.property('status', 200);
				expect(res.body.query.results.Result.length).to.equal(10);
				done();
			});
		});
	});
});