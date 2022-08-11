const unirest = require('unirest');
require('dotenv').config();

const fun = async (id)=>{
    console.log("inside");
    function getToken() {
        return new Promise((resolve, reject) => {
            const url = `https://api.notion.com/v1/pages/${id}/properties/title`;
          unirest
            .get(url)
            .headers({
                Accept: 'application/json',
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NOTION_KEY}`
              })
            .end(function (response) {
              if (response.error) {
                return reject(response.error)
              }
              return resolve(response.body);
            });
        })
      }
    
    var l = await getToken()
    console.log(l.results[0].title.plain_text);
    return(l.results[0].title.plain_text);
}

module.exports = fun;