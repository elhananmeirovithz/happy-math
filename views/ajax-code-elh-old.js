$('#plus').on('click', function () {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "./game-math1/targil/plus",
        data: {
            id: "somedata"
        },
        success: function (result) {
            $('#json').html('<pre>' + JSON.stringify(result, null, 2) + '</pre>');
            console.log(result)
        },
        error: function (result) {
            alert('error');
        }
    });
});

        $('#division').on('click',function(){
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "./game-math1/targil/division",
                data: {
                    id: "somedata"
                },
                success: function (result) {
                    $('#json').html('<pre>' + JSON.stringify(result, null, 2) + '</pre>');
                    console.log(result)
                },
                error: function (result) {
                    $('#json').html('<pre>' + JSON.stringify(result, null, 2) + '</pre>');
                }
            });
        });

        $('#minus').on('click',function(){
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "./game-math1/targil/minus",
                data: {
                    id: "somedata"
                },
                success: function (result) {
                    $('#json').html('<pre>' + JSON.stringify(result, null, 2) + '</pre>');
                    console.log(result)
                },
                error: function (result) {
                    $('#json').html('<pre>' + JSON.stringify(result, null, 2) + '</pre>');
                }
            });
        });

        $('#multiply').on('click',function(){
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "./game-math1/targil/multiply",
                data: {
                    id: "somedata"
                },
                success: function (result) {
                    $('#json').html('<pre>' + JSON.stringify(result, null, 2) + '</pre>');
                    console.log(result)
                },
                error: function (result) {
                    $('#json').html('<pre>' + JSON.stringify(result, null, 2) + '</pre>');
                }
            });
        });




        function func_changeText(id) {
            id.innerHTML = 'NEW GAME';
        }
