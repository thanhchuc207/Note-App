//GET homepage
exports.homepage=async(req,res)=>{
    const locals={
        title:'Nodejs notes',
        description:'Free nodejs noteapp'
    }

    res.render('index',{
        locals,
        layout:'../views/layouts/front-page'
    });
}

//GET About
exports.about=async(req,res)=>{
    const locals={
        title:'About - Nodejs notes',
        description:'Free nodejs noteapp'
    }

    res.render('about',locals);
}