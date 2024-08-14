import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../lib/localeStorage.services.js";
import { generateUniqueId } from "../lib/utile.js";


$(document).ready(function () {


    const courses = getFromLocalStorage('courses');

    // const tableBody = document.getElementById('contentCourses');
    // const inputArticle = document.getElementById('inputArticle');

    const protocol = window.location.protocol; // "http:" or "https:"
    const host = window.location.hostname; // "127.0.0.1"
    const port = window.location.port; // "5500"

    const displaycourses = (courses) => {


        courses.forEach((course, index) => {
            const row = $('<tr></tr>');


            if (course.isbuy) {
                const idChamp = $('<td></td>');
                idChamp.text(index + 1);
                idChamp.addClass('marque');
                row.append(idChamp);

                const nameChamp = $('<td></td>');
                nameChamp.text(course.name);
                nameChamp.addClass('marque');
                row.append(nameChamp);

                const createdAtChamp = $('<td></td>');
                createdAtChamp.text(new Date(course.created_at).toLocaleString());
                createdAtChamp.addClass('marque');
                row.append(createdAtChamp);

                const updatedAtChamp = $('<td></td>');
                if (course.updated_at) {
                    updatedAtChamp.text(new Date(course.updated_at).toLocaleString());
                } else {
                    updatedAtChamp.text('NaN');
                }
                updatedAtChamp.addClass('marque');
                row.append(updatedAtChamp);

                const isbuyChamp = $('<td></td>');
                isbuyChamp.html(`<button id="supprimer" class="supprimer" data-id="${course._id}">Supprimer</button>`);

                row.append(isbuyChamp);

            } else {
                // const idChamp = document.createElement('td');
                // idChamp.textContent = index + 1;
                // row.appendChild(idChamp);
                const idChamp = $('<td></td>');
                idChamp.text(index + 1);
                row.append(idChamp);

                const nameChamp = $('<td></td>');
                nameChamp.text(course.name);
                row.append(nameChamp);

                const createdAtChamp = $('<td></td>');
                createdAtChamp.text(new Date(course.created_at).toLocaleString());
                row.append(createdAtChamp);

                const updatedAtChamp = $('<td></td>');
                if (course.updated_at) {
                     updatedAtChamp.text(new Date(course.updated_at).toLocaleString());
                }else{
                    updatedAtChamp.text('NaN');
                }
                row.append(updatedAtChamp);

                const isbuyChamp = $('<td></td>');

                isbuyChamp.html(`<button id="marquer" class="marquer" data-id="${course._id}">Marquer</button>
                                    <button id="modifier"  class="modifier" data-id="${course._id}">Modifier</button>
                                    <button id="supprimer"  class="supprimer" data-id="${course._id}">Supprimer</button>
                                    `);
                row.append(isbuyChamp);
            }


            $('#contentCourses')?.append(row);
        });
    }

    if (courses) {
        displaycourses(courses);
    }


    $('#ajoutButton')?.click(function () {

        const path = "formModal.html"; // Your path to the HTML file

        const url = `${protocol}//${host}:${port}/${path}`;

        window.location.replace(url)
    });

    $('#submit')?.click((event) => {
        event.preventDefault()
        const data = {};

        if (_id_task_edite) {
            console.log(_id_task_edite);
            var newtag = $("#inputArticle").val();
            console.log(newtag);

            var newCourses = $.map(courses, (course) => {
                if (course._id === _id_task_edite) {
                    course.name = newtag;
                    course.updated_at = new Date()
                }
                return course;
            });
            console.log(newCourses);

            saveToLocalStorage('courses', newCourses);

            removeFromLocalStorage('_id_task_edite');

            const path = "index.html"; // Your path to the HTML file

            const url = `${protocol}//${host}:${port}/${path}`;

            window.location.replace(url)


            
        } else {
            data._id = generateUniqueId();
            data.name = $("#inputArticle").val();
            data.isbuy = false;
            data.created_at = new Date();
            data.updated_at = '';

            //  console.log($("#inputArticle").val());
            const datas = courses ? courses : [];
            datas.unshift(data);
            saveToLocalStorage('courses', datas);

            const path = "index.html"; // Your path to the HTML file

            const url = `${protocol}//${host}:${port}/${path}`;

            window.location.replace(url)
        }



    })


    $('.supprimer').each(function (index, buttonSupprimer) {
        // console.log(buttonSupprimer);

        $(buttonSupprimer).click(function (event) {
            event.preventDefault();

            const _id = $(event.target).attr('data-id');
            // console.log('id');


            const newCourses = courses.filter((course) => course._id !== _id);

            saveToLocalStorage('courses', newCourses);

            window.location.reload();
        });
    });

    $('.marquer').each(function (index, marquer) {
        $(marquer).click((event) => {
            event.preventDefault()
            const _id = $(event.target).attr('data-id');
            console.log(_id);

            const newCourses = courses.map((course) => {

                if (course._id === _id) {
                    course.isbuy = true;

                    console.log(course);

                }

                return course;
            });

            saveToLocalStorage('courses', newCourses);

            window.location.reload()

        });

    });

    $('.modifier').each(function (index, modifier) {
        $(modifier).click((event) => {
            event.preventDefault();
            const id = $(event.target).attr('data-id');

            saveToLocalStorage('_id_task_edite', id);

            const path = "formModal.html";

            const url = `${protocol}//${host}:${port}/${path}`;

            window.location.replace(url);

        });

    });

    const _id_task_edite = getFromLocalStorage('_id_task_edite');

    $.each(courses, (index, course) => {
        if (course._id === _id_task_edite) {
            $("#inputArticle").val(course.name);
        }
    });



    $('#articlesAcheter')?.click(() => {

        const datasArticlesAcheter = courses.filter((course) => course.isbuy === true)
        console.log(datasArticlesAcheter);

        $('#contentCourses')?.html("");
        $(datasArticlesAcheter)?.each(function (index, course) {

            const row = $('<tr></tr>');

            const idChamp = $('<td></td>');
            idChamp.text(index + 1);
            idChamp.addClass('marque')
            row.append(idChamp);

            const nameChamp = $('<td></td>');
            nameChamp.text(course.name);
            nameChamp.addClass('marque')
            row.append(nameChamp);

            const createdAtChamp = $('<td></td>');
            createdAtChamp.text(new Date(course.created_at).toLocaleString());
            createdAtChamp.addClass('marque')
            row.append(createdAtChamp);

            const updatedAtChamp = $('<td></td>');
            if (course.updated_at) {
                updatedAtChamp.text(new Date(course.updated_at).toLocaleString());
            } else {
                updatedAtChamp.text('NaN');
            }
            updatedAtChamp.addClass('marque');
            row.append(updatedAtChamp);

            const isbuyChamp = $('<td></td>');
            isbuyChamp.html(`<button id="supprimer" class="supprimer" data-id="${course._id}">Supprimer</button>`);
            row.append(isbuyChamp);

            $('#contentCourses')?.append(row);

        })

    })

    $('#articlesNonAcheter')?.click(() => {

        const datasArticlesNonAcheter = courses.filter((course) => course.isbuy === false)
        console.log(datasArticlesNonAcheter);

        $('#contentCourses')?.html("");
        $(datasArticlesNonAcheter)?.each((index, course) => {

            const row = $('<tr></tr>');

            const idChamp = $('<td></td>');
            idChamp.text(index + 1);
            row.append(idChamp);

            const nameChamp = $('<td></td>');
            nameChamp.text(course.name);
            row.append(nameChamp);

            const createdAtChamp = $('<td></td>');
            createdAtChamp.text(new Date(course.created_at).toLocaleString());
            row.append(createdAtChamp);

            const updatedAtChamp = $('<td></td>');
                if (course.updated_at) {
                    updatedAtChamp.text(new Date(course.updated_at).toLocaleString());
                } else {
                    updatedAtChamp.text('NaN');
                }
                row.append(updatedAtChamp);

            const isbuyChamp = $('<td></td>');
            isbuyChamp.html(`<button id="marquer" class="marquer" data-id="${course._id}">Marquer</button>
                                <button id="supprimer"  class="supprimer" data-id="${course._id}">Supprimer</button>`);
            row.append(isbuyChamp);

            $('#contentCourses')?.append(row);

        })

    })

    $('#deletAllCourses')?.click(() => {
        removeFromLocalStorage('courses');
        window.location.reload();
    })

    $('#cancel')?.click(() => {
        const path = "index.html"; // Your path to the HTML file

        const url = `${protocol}//${host}:${port}/${path}`;

        window.location.replace(url);

        removeFromLocalStorage('_id_task_edite');

    })

})





