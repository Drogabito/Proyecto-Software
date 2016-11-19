module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {
    app.get('/lista', isLoggedIn, function(req, res) {
        if (req.user.Profesor != 0) {
            res.render('menu/lista.ejs', {
                title: title,
                user: req.user,
            });
        }
        else {
            res.redirect('/menu');
        }
    });


    app.post('/agregarLista', isLoggedIn , upload.any(), function(req, res) {
        if (req.user.Profesor != 0) {
            var XLSX = require('xlsx');
            var multer  = require('multer')
            var upload = multer({ dest: 'uploads/' })
            console.log(req.files);
            /*var workbook = XLSX.readFile();
            var sheet_name_list = workbook.SheetNames;
            var lista = [];
            sheet_name_list.forEach(function(y) {
                var worksheet = workbook.Sheets[y];
                var c=0;
                var values=[];
                for (z in worksheet) {
                    if(z[0] === '!') continue;
                    values[4]=values[5]=0;
                    if(c%4===0){
                        values[0]=worksheet[z].v;
                        var clave=values[0].toString();
                        values[3]=bcrypt.hashSync(clave, null, null);
                    }
                    else if(c%4===1) values[6]=worksheet[z].v;
                    else if(c%4===2) values[1]=worksheet[z].v;
                    else if(c%4===3){
                        values[2]=worksheet[z].v;
                        lista.push(values);
                        var values=[];
                    }
                    c++;
                }
            });
            //Aqui empieza el verdadero viaje
            agregar(lista,1);
            res.redirect('/signup');
            function agregar(lista,flag) {
                if(lista.length!=0){
                    var valores=lista.pop();
                    connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Correo = ? OR Rut = ? OR Rol = ?", [valores[2], valores[0], valores[6]], function(err, rows) {
                        if (err) console.log("Error1");
                        if (rows.length) { //Busca si ya hay un email o rol o rut registrado del form. Agrega errores correspondientes
                            var messages2 = [];
                            for (var j = 0; j < rows.length; j++) {
                                if (rows[j].Correo == valores[2]) {
                                    messages2.push('Este Email ya está en uso.');
                                    flag=0;
                                }
                                if (rows[j].Rut == valores[0]) {
                                    messages2.push('Ya hay una cuenta asociada a este Rut');
                                    flag=0;
                                }
                                if (rows[j].Rol == valores[6]) {
                                    messages2.push('Ya hay una cuenta asociada a este Rol');
                                    flag=0;
                                }
                            }

                        }
                        else {
                            // Se crea el usuario
                            var insertQuery = "INSERT INTO " + dbconfig.users_table + " ( Rut, Nombre, Correo, Clave, Admin, Profesor, Rol ) values (?,?,?,?,?,?,?)";
                            connection.query(insertQuery, valores, agregar(lista,flag));
                        }
                    });
                }
                else if(flag===0){
                    req.flash('Error',['Hubo un problema agregando a los alumnos.']);
                }
                else req.flash('exito', ['Se agregaron los alumnos exitosamente.']);

            }*/
        }
        else {
            res.redirect('/menu');
        }
    });
}
