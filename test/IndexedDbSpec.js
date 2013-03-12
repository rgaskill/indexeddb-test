describe('DeleteDatabase', function() {

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var dbName = 'TestDb';
    var db;

    it("should delete database after explicit close", function() {

        runs(function() {

            var done = false;
            var request = window.indexedDB.open(dbName);


            request.onerror = function(event) {
                console.log("open error", event);
                done = true;
            };

            request.onsuccess = function(event) {
                console.log("open success", event);
                db = this.result;
                done = true;
            };

            waitsFor(function() {
                return done;
            },5000);

        });

        runs(function(){

            db.close();

            var request = window.indexedDB.deleteDatabase(dbName);
            var done = false;

            request.onerror = function(event) {
                console.log("delete error", event);
                done = true;
            };

            request.onsuccess = function(event) {
                console.log("delete success", event);
                done = true;
            };

            waitsFor(function() {
                return done;
            },5000);


        });


    });

    it("should delete database after version change event", function() {

        runs(function() {

            var done = false;
            var request = window.indexedDB.open(dbName);


            request.onerror = function(event) {
                console.log("open error", event);
                done = true;
            };

            request.onsuccess = function(event) {
                console.log("open success", event);
                db = this.result;

                db.onversionchange = function(event) {
                    console.log("version change", event);
                    //empty version implies that the database is being deleted
                    if ( !event.version ){
                        db.close();
                    }
                };

                done = true;
            };

            waitsFor(function() {
                return done;
            },5000);

        });

        runs(function(){

            var request = window.indexedDB.deleteDatabase(dbName);
            var done = false;

            request.onerror = function(event) {
                console.log("delete error", event);
                done = true;
            };

            request.onsuccess = function(event) {
                console.log("delete success", event);
                done = true;
            };

            waitsFor(function() {
                return done;
            },5000);


        });


    });

});

describe('IndexedDb Test Template', function() {

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var dbName = 'TestDb';
    var db;

    beforeEach(function() {

        runs(function() {

            var done = false;
            var request = window.indexedDB.open(dbName);


            request.onerror = function(event) {
                console.log("open error", event);
                done = true;
            };

            request.onsuccess = function(event) {
                console.log("open success", event);
                db = this.result;
                done = true;
            };

            waitsFor(function() {
                return done;
            },5000);

        });

    });

    afterEach(function() {

        runs(function(){

            db.close();

            var request = window.indexedDB.deleteDatabase(dbName);
            var done = false;

            request.onerror = function(event) {
                console.log("delete error", event);
                done = true;
            };

            request.onsuccess = function(event) {
                console.log("delete success", event);
                done = true;
            };

            waitsFor(function() {
                return done;
            },5000);


        });

    });

    it("should do some database work and be confident the db is clean at the beginning of the test.", function() {






    });



});




