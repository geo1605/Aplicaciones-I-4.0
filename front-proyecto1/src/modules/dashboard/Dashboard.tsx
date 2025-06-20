import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import MenuDynamic from "./MenuDynamic";
import { Header } from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";
import { Footer } from "antd/es/layout/layout";

function Dashboard() {
    return (
            <Layout>
                <Header />
                <Content style={{ padding: '24', margin: '24px 16px 0' }}>
                    <Outlet />
                </Content>
                <Footer />
            </Layout>
    )
}

export default Dashboard;
