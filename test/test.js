var logger = require("tracer").console();
var FieldVal = require('fieldval');
var bval = require('fieldval-basicval');
var dval = require("../src/DateVal");
var assert = require("assert")

describe('DateVal', function() {
    describe('date()', function() {
        it('should return a date string when an string of valid syntax is present', function() {
            var my_validator = new FieldVal({
                "my_date_1": "04/07/2014",
                "my_date_2": "1/2/34",
                "my_date_3": "1-2-34",
                "my_date_4": "29:2",
                "my_date_5": "2014 05 27",
                "my_date_6": "07/30/14",
                "my_date_7": "30/07/14",
                "my_date_8": "29/02/04",
                "my_date_9": "29/05/2014 15:45:12"
            })

            assert.equal("04/07/2014", my_validator.get("my_date_1", bval.string(true), dval.date("dd/MM/yyyy")));
            assert.equal("1/2/34", my_validator.get("my_date_2", bval.string(true), dval.date("d/M/yy")));
            assert.equal("1-2-34", my_validator.get("my_date_3", bval.string(true), dval.date("d-M-yy")));
            assert.equal("29:2", my_validator.get("my_date_4", bval.string(true), dval.date("d:M")));
            assert.equal("2014 05 27", my_validator.get("my_date_5", bval.string(true), dval.date("yyyy MM dd")));
            assert.equal("07/30/14", my_validator.get("my_date_6", bval.string(true), dval.date("MM/dd/yy")));
            assert.equal("30/07/14", my_validator.get("my_date_7", bval.string(true), dval.date("dd/MM/yy")));
            assert.equal("29/02/04", my_validator.get("my_date_8", bval.string(true), dval.date("dd/MM/yyyy")));
            assert.equal("29/05/2014 15:45:12", my_validator.get("my_date_9", bval.string(true), dval.date("dd/MM/yyyy hh:mm:ss")));
            assert.equal(null, my_validator.end());
        }) 
    })

    describe('date_format()', function() {
        it('should return a date format array when a valid string is provided', function() {
            var my_validator = new FieldVal({
                "my_format": "yyyy-MM-dd"
            })
            assert.deepEqual(["yyyy","-","MM","-","dd"], my_validator.get("my_format", bval.string(true), dval.date_format()));
            assert.equal(null, my_validator.end());
        })
    })
})