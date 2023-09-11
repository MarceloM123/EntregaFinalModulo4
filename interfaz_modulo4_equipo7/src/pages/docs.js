import { Col, Row, Form, Card, Typography} from "antd"
import PageLayout from "/src/components/layout"

const {Text} = Typography;

export default function docs () {
    return (
        <PageLayout>
            <Row justify="center" align="stretch" style={{ minHeight: "75vh" }}>
                <Col span={24} style={{ maxWidth: "45%", display: "flex", flexDirection: "column" }}>
                        <Col>
                            <Row justify = "center" style={{ margin: "10px" }}>
                                <Text style={{textAlign: "justify"}}>
                                El 15 de abril de 1912 el Titanic RMS se hundió después de haber chocado con un iceberg. Desafortunadamente, no había suficientes botes salvavidas para todos los que estaban a bordo, lo cual resultó en el fallecimiento de 1502 de los 2224 pasajeros y tripulantes. Si bien hubo algún elemento de suerte involucrado en la supervivencia, parece que algunos grupos de personas tenían más probabilidades de sobrevivir que otros. 

<br/><br/>Nuestro trabajo consiste en construir un modelo de predicción que responda a la siguiente pregunta: ¿qué tipo de personas tenían más probabilidades de sobrevivir? Utilizando los datos de los pasajeros que están en los archivos train.csv y test.csv, disponibles en la plataforma Kaggle: Titanic - Machine Learning from Disaster

<br/><br/>El archivo train.csv contiene detalles de un subconjunto de 891 pasajeros, en el cual se revela cuáles de estos pasajeros sobrevivieron o no al accidente (ground truth). Por otro lado, el archivo test.csv contiene información similar pero no revela el resultado de supervivencia de cada pasajero. Este último archivo se utilizará para probar la efectividad de nuestro modelo de predicción. Utilizando los patrones encontrados en los datos de train.csv, nosotros necesitamos predecir si los otros 418 pasajeros a bordo (test.csv) sobrevivieron. 

<br/><br/>Por lo tanto, en resumidas cuentas, nuestro objetivo es crear un modelo que predice cuáles pasajeros sobrevivieron al naufragio del Titanic. La métrica de éxito para este reto corresponde al porcentaje de similitud que tienen los resultados de nuestro modelo comparado con los datos reales.

                                </Text>
                            </Row>
                        </Col>
                </Col>
            </Row>
        </PageLayout>
    )
}