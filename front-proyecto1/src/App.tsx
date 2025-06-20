import './App.css'
import  Userform from './modules/User/UserForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MenuDynamic from './modules/dashboard/MenuDynamic';
import Dashboard from './modules/dashboard/Dashboard';
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";

function App() {

  return (
    <>
    <Layout style={{ minHeight: "100vh" }}>
      <Router>
        <Sider width={220}>
                <MenuDynamic />
            </Sider>
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route path="/user" element={<Userform />} />
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/contact" element={} /> */}
        </Routes>
      </Router>
      </Layout>
    </>
  )
}

export default App
