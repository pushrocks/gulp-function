### Usage
```javascript
import * as gulp from 'gulp';
import gulpFunction from 'gulp-function' // default ES6 export
// import {forFirst, forEach, atEnd} from 'gulp-function'
let Q = require("q");

let myFunction = function (file, enc) { // file and enc are optional in case you want to modify the file object
    let done = Q.defer();
    console.log("Hello World!")
    
    // NOTE:
    // you can use done.resolve as callback function
    // of any async tasks within this function
    done.resolve();
    
    return done.promise;
}

gulp.task('gulpTest',function() {
    let stream = gulp.src('./mydir/*.something')
        .pipe(gulpFunction(myFunction,'forEach')) //read the notes below
        // .pipe(forEach(myFunction)) // if imported as >> import { forEach } from 'gulp-function' <<
        .pipe(gulp.dest("./build/"));
    return stream; // by returning the stream gulp knows when our task has finished.
});
```

### Notes:

* The first argument of gulpFunction can also be an **array of multiple functionnames**.
Each function can return a promise. The pipe stop will finish when every promise is fullfilled.
When providing an array of functions be careful with modifying the file object -> race condition
* The second argument can be empty, it defaults to "forEach"
* The following options are available:
    * "forFirst" - executes when first chunk/vinylfile of the stream reaches the pipestop.
       file is pushed further down the line when function's returned promise is fullfilled.
    *  "forEach" - executes like "forFirst" but with every chunk/vinylfile in the stream;
    *  "atEnd" - executes after all chunks have passed and are processed in full.
       That means the stream's "finish" event fires **before "atLast" is executed**!!!