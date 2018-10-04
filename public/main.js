let Unicorns = [];
function findIndex(ID) {
    for (let i = 0; i < Unicorns.length; i++) {
        if (Unicorns[i]._id == ID) {
            return i;
        }
    }
    return -1;
}

function onLoad() {
    getUnicorns()
        .then(function () {
            renderUnicorns(Unicorns)
        })
        .fail(function (error) {
            throw error;
        })
}

$('#addunicorn').on('click', function () {
    let name = $('#name').val();
    let magic = $('#magic').val();
    if (name == "" || magic == "") {
        alert("Please enter name and magic!");
    }
    else {
        addunicorn(name, magic)
            .then(function () { renderUnicorns(Unicorns) })
        // name.val("");
        // magic.val("");
    }
});

$('.Unicorns').on('click', '.remove-unicorn', function () {
    let unicornID = $(this).closest('.unicorn').data().id;
    let index = findIndex(unicornID);
    Removeunicorn(index, unicornID)
        .then(function () { renderUnicorns(Unicorns) });
});

function getUnicorns() {
    return $.get('/unicorns').then(function (data) {
        Unicorns = data;
    })
        .fail(function (error) {
            throw error;
        })
}

function addunicorn(name, magic) {
    let newUnicorn = { Name: name, Magic: magic };
    return $.post('unicorns', newUnicorn)
        .then(function (unicorn) {
            Unicorns.push(unicorn)
        })
        .fail(function (error) {
            throw error
        })
}

function Removeunicorn(index, unicornID) {
    return $.ajax({
        method: 'DELETE',
        url: '/unicorns/' + unicornID
    })
        .then(function () {
            Unicorns.splice(index, 1);
        })
        .fail(function (error) {
            throw error
        })
}

function renderUnicorns(Unicorns) {
    $('.Unicorns').empty();
    var source = $('#unicorns-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template({ Unicorns });
    $('.Unicorns').append(newHTML);
}

onLoad();