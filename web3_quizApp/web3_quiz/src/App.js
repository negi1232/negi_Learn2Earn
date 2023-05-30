import { useEffect, useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav_menu from "./pages/navbar/navbar";
import Create_quiz from './pages/create_quiz/create_quiz';
import List_quiz from "./pages/list_quiz/list_quiz_top";
import Answer_quiz from "./pages/answer_quiz/answer_quiz";
import Modal_change_network from "./contract/Modal_change_network";
import Modal_login from "./contract/Modal_login";

import { Contracts_MetaMask } from "./contract/contracts";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const cont = new Contracts_MetaMask();

  const [is_connect, setIs_connect] = useState(true);
  const [chain_id, setChain_id] = useState(null);


  useEffect(() => {
    //非同期処理をUseEffect内で行う場合は、async/awaitを使用する
    const get_variable = async () => {

      setChain_id(await cont.get_chain_id());
      setIs_connect(await cont.isMetaMaskConnected());
      if (window.ethereum) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

      }
    }
    get_variable();
  }, [])
  if (is_connect == true && chain_id == "0x13466") {
  return (

    <div className="App">
      <body>
        <div >
          <Router basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path={'/create_quiz'} element={<Create_quiz url={'create_quiz'} />} cont={cont} />
            </Routes>
            <Routes>
              <Route path={'/list_quiz'} element={<List_quiz url={'list_quiz'} />} cont={cont} />
            </Routes>
            <Routes>
              {/* <Route path={'/answer_quiz/:id'} element={<Answer_quiz url={'answer_quiz'} />} cont={cont} /> */}
              <Route path={'/answer_quiz/:id'} element={<Answer_quiz url={'answer_quiz'} />} cont={cont} />
              quiz_comp
            </Routes>

          </Router>
        </div>
        <div>
          <Nav_menu cont={cont} />
        </div>

      </body>


    </div>

  );
  }
  else{
    return(
      <div className="App">
        <Modal_change_network chain_id={chain_id} cont={cont} />
        {!is_connect && <Modal_login cont={cont} />}
      </div>
    )
  }
}

export default App;
