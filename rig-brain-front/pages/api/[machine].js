import {useRouter} from "next/router";

const host = "http://localhost:5000/"


async function handler(req, res){

    // todo transformar chamadas em post
    // if (req.method === 'POST') {
    //     // Process a POST request
    // } else {
    //     // Handle any other HTTP method
    // }

  try{
      let machine = req.query.machine;
      let action = req.query.action;

      let url = "";

      if(action){
        url = `${this.host}${machine}/on`
      }else{
        url = `${this.host}${machine}/off`
      }

      let response = await fetch(url);

      console.log("response -> ", JSON.stringfy(response));

      if(response.ok){
        let content = await response.json();

        console.log("response -> ", content);
      }

      res.status(200).json({ "status": "ok" })

  }catch (e) {
    console.log(`algo deu errado ${JSON.stringfy(e)}`);
    res.status(500).json({ "status": "fail" })
  }
}

export default handler;