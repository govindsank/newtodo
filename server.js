const port = 3000;

const { error, log } = require("console");
const http =require("http");
const path = require("path");
const fs = require("fs") ;
const url =require("url");

const appserver = http.createServer((req,res)=>{
    // res.write("welcome to node server version 20.5");

    const path =url.parse(req.url,true);
    console.log(path);
// if(path.pathname == "/form"){
//     res.writeHead(200,{
//         "Content-Type":"text/html"
//     })
//     res.write(`
//     <form>
//         <input type = "text" placeholder="Text"/>
//         <input type = "submit"/>
//     </form>

//     `);
//     res.end();
//     return;
// }

if(path.pathname == "/"){
   
    fs.readFile("./index.html","utf-8",(error,data) =>{
        if(error){

            console.log(error);
            res.write("error occured");
            res.end();
            return;

        }

         res.writeHead(200,{
        "Content-Type":"text/html"
    })
    res.write(data);
    res.end();
    })
    return;
}

// if(path.pathname =="/form"){
//     let form = path.query;
//     fs.readFile("./data.json","utf-8",(error,data) =>{
//         if(error){
//             console.log(error);
//             res.write("error");
//             res.end();
//             return;
//         }
//         let forms =data ? JSON.parse(data):[];
//         forms.push(form);
//         fs.writeFile("./todos.json",JSON.stringify(todos), error => {
//             if(error){
//                 console.log(error);
//                 res.write("error occured");
//                 res.end();
//                 return;
//             }
//             res.end("form update");
//         })
//     })
//     return;
// }

if(path.pathname =="/set-todo"){
    let todo = path.query;
    fs.readFile("./todos.json","utf-8",(error,data) =>{
        if(error){
            console.log(error);
            res.write("error");
            res.end();
            return;
        }
        let todos =data ? JSON.parse(data):[];
        todos.push(todo);
        fs.writeFile("./todos.json",JSON.stringify(todos), error => {
            if(error){
                console.log(error);
                res.write("error occured");
                res.end();
                return;
            }
            res.end("Todo added successfully");
        })
    })
    return;
}

if(path.pathname == "/get-todo"){
    fs.readFile("./todos.json","utf-8",(error, data) =>{
        if(error){
            console.log(error);
            res.write("error");
            res.end();
            return;
        }
        res.writeHead(200, {
            "Content-Type":"application/json",
        });
        res.write(data);
        res.end();
    });
    return;
}

if(path.pathname == "/edit-todo"){
    let { id, newTodo } = path.query;
    fs.readFile("./todos.json","utf-8",(error,data) =>{
        if(error){
            console.log(error);
            res.write("error");
            res.end();
            return;
        }

            let todos =data ? JSON.parse(data):[];
            todos = todos.map((item,index) =>
            index == id ?{ todo: newTodo } : item
            );
            fs.writeFile("./todos.json",JSON.stringify(todos),error =>{
                if(error){
                    console.log(error);
                    res.write("error");
                    res.end();
                    return;
                }
                res.write("Todo edited succesfully");
                res.end();
            })

    });
    return;
}
// if(path.pathname=="/delete-todo"){
//     let { id} = path.query;
//     fs.readFile("./todos.json","utf-8",(error,data)=>{
//         if(error){
//             console.log(error);
//             res.write("error");
//             res.end();
//             return;
//         }
//         let todos =data ? JSON.parse(data);
//         todos.filter
//     })
// }

res.write("this is a node server");
res.end();

if(path.pathname =="/data"){

    let data= path.query;
    fs.writeFile("./data.txt",data.myname,error =>{
        if(error){

            console.log(error);
            res.write("error occured");
            res.end();
            return;

        }

        res.write("data recieved");
        res.end();

    })
    return;
    // res.writeHead(200,{
    //     "Content-Type":"text/html"
    // })


    // res.write(`<b>data received</b>`);
    // res.end();
    // return;
}
// if(path.pathname =="/api"){
//     res.writeHead(200,{
//         "Content-Type":"text/html"
//     })
//     res.write(`<b>This is an API</b>`);
//     res.end();
//     return;
// }
    // res.end();
});


appserver.listen(port,error=>{
    if(error){
        console.log(error);
        return ;
    }else{
    console.log("server started at port "+port);
}
})

// const port = 3000;

// const { error } = require("console");
// const http =require("http");
// const path = require("path");
// const fs = require("fs") ;
// const url =require("url");

// const appserver = http.createServer((req,res)=>{
//     // res.write("welcome to node server version 20.5");

//     const path =url.parse(req.url,true);
//     console.log(path);
// // if(path.pathname == "/form"){
// //     res.writeHead(200,{
// //         "Content-Type":"text/html"
// //     })
// //     res.write(`
// //     <form>
// //         <input type = "text" placeholder="Text"/>
// //         <input type = "submit"/>
// //     </form>

// //     `);
// //     res.end();
// //     return;
// // }

// if(path.pathname == "/"){
   
//     fs.readFile("./index.html","utf-8",(error,data) =>{
//         if(error){

//             console.log(error);
//             res.write("error occured");
//             res.end();
//             return;

//         }

//          res.writeHead(200,{
//         "Content-Type":"text/html"
//     })
//     res.write(data);
//     res.end();
//     })
//     return;
// }
// if(path.pathname =="/data"){

//     let data= path.query;
//     fs.writeFile("./data.txt",data.myname,error =>{
//         if(error){

//             console.log(error);
//             res.write("error occured");
//             res.end();
//             return;

//         }

//         res.write("data recieved");
//         res.end();

//     })
//     return;
//     // res.writeHead(200,{
//     //     "Content-Type":"text/html"
//     // })


//     // res.write(`<b>data received</b>`);
//     // res.end();
//     // return;
// }
// // if(path.pathname =="/api"){
// //     res.writeHead(200,{
// //         "Content-Type":"text/html"
// //     })
// //     res.write(`<b>This is an API</b>`);
// //     res.end();
// //     return;
// // }
//     // res.end();
// });


// appserver.listen(port,error=>{
//     if(error){
//         console.log(error);
//         return ;
//     }else{
//     console.log("server started at port "+port);
// }
// })