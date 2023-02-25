function makeobject() {
  const phonenumber = "2" + document.getElementById('phone').value;
  const customerName = document.getElementById('name').value;
  const offer = document.getElementById('offer').value;
  const price = document.getElementById('price').value;

  const createRequestObject = {
      messaging_product: "whatsapp",
      to: phonenumber,
      type: "template",
      template: {
        name: "sharemyproduct",
        language: {
            code: "en_US",
            policy: "deterministic"
        },
        components: [
            {
                type: "header",
                parameters: [
                    {
                        type: "text",
                        text: customerName
                    }
                ]
            },
            {
                type: "body",
                parameters: [
                    {
                        type: "text",
                        text: offer
                    },
                    {
                        type: "text",
                        text: price
                    }
                ]
            }
        ]
      }
  };

  return createRequestObject;
}



function SetData(url,myCallback) {
    $.ajax({
        type: 'POST',
        dataType:"json",
        url: url,
        headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
        data: JSON.stringify(makeobject()),
        success: function (data, status, xhr) {
          console.log('data: ', status);
          myCallback(status)
        }
    });
}


function SendMessage() {

    SetData(baseurl,response => {
        if (response == 'success') {
          document.getElementById('phone').value = "";
          document.getElementById('name').value = "";
          document.getElementById('offer').value = "";
          document.getElementById('price').value = "";

          alert('we send a message sucess!');
        }
    });
}