import React, {useState, useEffect} from "react"
import { Breadcrumb, Layout, Menu, Typography, Spin, Row, Col} from 'antd';
import Router, { useRouter } from "next/router";
import styles from '../style/layout.module.css';
import {
    LoadingOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const {Text} = Typography;

export default function PageLayout ({children}) {
    const router = useRouter();
	const [current, setCurrent] = useState("Random Forest");
    const [loading, setLoading] = useState(false);

    const handleRouteChangeStart = () => {
        setLoading(true);
    };

    const handleRouteChangeComplete = (url) => {
        setLoading(false);

        if (url === "/docs") {
            setCurrent("Docs");
        } else if (url === "/randomForest") {
            setCurrent("Random Forest");
        }
    };

    useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
        Router.events.off('routeChangeStart', handleRouteChangeStart)
        Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
    }, [])
	
    const menuItems = [
		{ key: "Random Forest", texto: "Random Forest" },
		{ key: "Docs", texto: "Docs" },
	];

    const onClickMenu = (e) => {
        setCurrent(e.key);
        if (e.key === "Docs") router.push("/docs");
        else if (e.key === "Random Forest") router.push("/randomForest");
    };
    
    return (
    <Layout>
        <Header
            style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            }}
        >              
        <div/>
        <Text strong className = {styles.title}> E7 </Text>
            <Menu
            mode="horizontal"
            style={{ display: "flex", float: 'right'}}
            selectedKeys={[current]}>
            {menuItems.map((e) => (
                <Menu.Item
                    key={e.key}
                    style={{ margin: "0 20px" }}
                    onClick={onClickMenu}>
                    {e.texto}
                </Menu.Item>
            ))}
        </Menu>
        </Header>
        <Content
            className = {styles.content}
                
        >
            <Breadcrumb
            style={{
                margin: '16px 50px',
            }}
            >
            <Breadcrumb.Item><strong>{current}</strong></Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.content}>
            <Spin
                spinning={loading}
                indicator={
                <Row justify="center" align="middle">
                    <Col
                    span={24}
                    style={{ textAlign: "center", justifyContent: "center" }}
                    >
                    <LoadingOutlined
                        style={{
                        fontSize: "100px",
                        fontWeight: "bolder",
                        color: "blue",
                        }}
                    ></LoadingOutlined>
                    </Col>
                </Row>
                }
            >
                {children}
            </Spin>
            </div>
        </Content>
        <Footer
            className = {styles.footer}
        >
            <Text italic>Equipo 7 <strong>©2023</strong></Text>
        </Footer>
        </Layout>
    )
}