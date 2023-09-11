import React from "react"
import { Col, Row, Table, Typography } from "antd";
import PageLayout from "/src/components/layout";

const { Text } = Typography;
const { Column } = Table;

export default function TableResults({jsonDataForm}) {
    console.log(jsonDataForm)
    return (
        <Row
            style={{
                padding: "2rem",
                width: "100%",
                justifyContent: "center",
            }}>
        <Row
            style={{
                width: "100%",
            }}
            justify="center"
            gutter={16}
            align="middle">
            <Col flex="auto">
                <Table
                    pagination={true}
                    expandable={true}
                    rowKey="PassengerId"
                    dataSource={jsonDataForm ? jsonDataForm.map((el, i) => ({ key: i, ...el })) : []}
                    scroll={{
                        x: 1000,
                        y: 800,
                    }}>
                    <Column
                        title="ID"
                        dataIndex="PassengerId"
                        key="PassengerId"
                        width={90}
                        align="center"
                        ></Column>
                    <Column
                        title="Survived"
                        dataIndex = "Prediction"
                        key="Prediction"
                        width={80}
                        align="center"></Column>
                </Table>
            </Col>
        </Row>
    </Row>
    );
}
