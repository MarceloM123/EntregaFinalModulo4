import React, { useState, useRef } from "react";
import { Col, Row, Form, Card, Typography, Input, Select, Button, Divider } from "antd";
import PageLayout from "/src/components/layout";
import styles from '../style/layout.module.css';
import { FileExcelOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import APIMethods from "/src/hooks/APIMethods"
import TableResults from "/src/pages/TableResults"

const { Text } = Typography;

export default function randomForest() {
    const [formDataJson, setFormDataJson] = useState(); 
    const [jsonDataForm, setJsonDataForm] = useState();
    const fileInputRef = useRef(null);
    const router = useRouter();

    const handleFileInputChange =(e) =>{
        const file = e.target.files[0];
    
        if (!file) {
            return;
        }
    
        const reader = new FileReader();
    
        reader.onload = async function (e) {
            const csvText = e.target.result;
            const dataArray = parseCsvToArray(csvText);
    
            if (dataArray.length > 0) {
                const jsonDataArray = dataArray.map((row, index) => ({
                    PassengerId: index + 1,
                    Pclass: parseInt(row.Pclass, 10),
                    Age: parseInt(row.Age, 10),
                    Sex: parseInt(row.Sex, 10),
                    Fam: parseInt(row.Fam, 10),
                    Fare: parseInt(row.Fare, 10),
                    Embarked: parseInt(row.Embarked, 10),
                }));

                const firstTenRows = jsonDataArray.slice(0, 10);
    
                const jsonDataFormString = JSON.stringify(firstTenRows);
                console.log(jsonDataFormString);
                let data = await APIMethods.postPassenger(jsonDataFormString);
                console.log(data)
                setJsonDataForm(data);
            }
        };
    
        reader.readAsText(file);
    }

    const parseCsvToArray = (csvText) => {
        const lines = csvText.split('\n');
        const header = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const entry = {};

            for (let j = 0; j < header.length; j++) {
                entry[header[j]] = values[j];
            }

            data.push(entry);
        }

        return data;
    };


    async function onFinish(values){
        const formData = [{
            PassengerId: 0,
            Pclass: parseInt(values.pclass, 10),
            Age: parseInt(values.age, 10),
            Sex: parseInt(values.sex, 10),
            Fam: parseInt(values.fam, 10),
            Fare: parseInt(values.fare, 10),
            Embarked: parseInt(values.embarked, 10),
        }];

        const formDataJson = JSON.stringify(formData);
        console.log('JSON:', formDataJson);

        let data = await APIMethods.postPassenger(formDataJson)
        setFormDataJson(data[0].Prediction)
        
    };

    return (
        <PageLayout>
            
            <Row justify="center" align="stretch" style={{ minHeight: "75vh" }}>
                <Col span={24} style={{ maxWidth: "45%", display: "flex", flexDirection: "column" }}>
                    <Card className={styles.cards} style={{ width: "100%", height: "90%", padding: "20px" }}>
                        <Form layout="vertical" name="inputForm" onFinish={onFinish}>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item
                                        name="pclass"
                                        label="Pclass"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="fam"
                                        label="Fam"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="age"
                                        label="Age"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="fare"
                                        label="Fare"
                                    >
                                        <Select
                                            placeholder="Select Fare"
                                            dropdownStyle={{ textAlign: "center" }}
                                            options={[
                                                {
                                                    value: 1,
                                                    label: <span>1</span>,
                                                },
                                                {
                                                    value: 2,
                                                    label: <span>2</span>,
                                                },
                                                {
                                                    value: 3,
                                                    label: <span>3</span>,
                                                },
                                                {
                                                    value: 4,
                                                    label: <span>4</span>,
                                                },
                                                {
                                                    value: 5,
                                                    label: <span>5</span>,
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="sex"
                                        label="Sex"
                                    >
                                        <Select
                                            placeholder="Select Sex"
                                            dropdownStyle={{ textAlign: "center" }}
                                            options={[
                                                {
                                                    value: 1,
                                                    label: <span>Male</span>,
                                                },
                                                {
                                                    value: 0,
                                                    label: <span>Female</span>,
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="embarked"
                                        label="Embarked"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="center" align="middle">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100px', borderRadius: '6px' }}>
                                        Run
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="default" onClick={() => fileInputRef.current.click()} style={{ backgroundColor: "#008000", marginLeft: "7rem" }}>
                                        <Text style={{ color: "white" }}> Import </Text>
                                        <FileExcelOutlined style={{ color: "white" }}></FileExcelOutlined>
                                    </Button>
                                </Form.Item>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileInputChange}
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                />
                            </Row>
                        </Form>
                        <Divider style={{ borderTop: '2px solid #D3D3D3' }}></Divider>
                        <Row justify="center">
                            <Text> Results </Text>
                        </Row>
                        <Row justify="center">
                            <Col>
                                <Row margin="10px 0 10px 0" justify="center">
                                    <Text strong style={{ textAlign: 'center', fontSize: '18px' }}>Survived</Text>
                                </Row>
                                <Row justify="center">
                                    <Text strong style={{ fontSize: '30px' }}>{formDataJson}</Text>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Row>
                <TableResults jsonDataForm={jsonDataForm} />
                </Row>
            </Row>
        </PageLayout>
    );
}
