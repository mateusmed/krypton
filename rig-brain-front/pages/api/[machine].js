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

      console.log(`machine ${machine}`);
      console.log(`action ${action}`);


      let url = `${this.host}${machine}/status`;

      if(action){
        url = `${this.host}${machine}/on`
      }else{
        url = `${this.host}${machine}/off`
      }

      let response = await fetch(url);

      console.log("response -> ", JSON.stringify(response));

      if(response.ok){
        let content = await response.json();
        console.log("content -> ", content);
      }

      res.status(200).json({ "status": "ok" })

  }catch (e) {
    console.log(`algo deu errado`, e);
    res.status(500).json({ "status": "fail" })
  }
}

export default handler;