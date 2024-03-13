import React, { FC } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
//import "swiper/css/effect-coverflow"
import "swiper/css/effect-cube"
import "swiper/css/pagination"
import "swiper/css/navigation"

import "../constants/style.css"

// import required modules
import {
    //EffectCoverflow,
    Pagination,
    EffectCube,
    Navigation,
} from "swiper/modules"
import { Card, CardContent, Typography, Slider, Box, Grid } from "@mui/material"
//import { blue } from "@mui/material/colors"

interface QuestionProps {
    question: any
    average: any
}
interface RubriqueProps {
    questions: any
    title: any
}
const QuestionCard: FC<QuestionProps> = ({ question, average }) => {
    const marks = [
        {
            value: 1,
            label: "1",
        },
        {
            value: 2,
            //label: "20°C",
        },
        {
            value: 3,
            //label: "37°C",
        },
        {
            value: 4,
            // label: "100°C",
        },
        {
            value: 5,
            label: "5",
        },
    ]
    return (
        <Card variant="outlined" sx={{ maxWidth: 400, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    {question}
                </Typography>
                {/* Slider affichant la moyenne de la question */}
                <Typography variant="body1" gutterBottom>
                    Moyenne :
                </Typography>
                <Box sx={{ width: "80%", margin: "auto" }}>
                    <Slider
                        marks={marks}
                        value={average}
                        valueLabelDisplay="on"
                        min={1}
                        max={5}
                        disabled
                        // sx={{
                        //     "& .MuiSlider-thumb": {
                        //         backgroundColor: blue[300], // Modifier la couleur du curseur
                        //     },
                        //     "& .MuiSlider-rail": {
                        //         backgroundColor: blue[100], // Modifier la couleur de la barre
                        //     },
                        //     "& .MuiSlider-track": {
                        //         backgroundColor: blue[500], // Modifier la couleur de la piste
                        //     },
                        // }}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

const RubriqueCard: FC<RubriqueProps> = ({ title, questions }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                width: "100%",
                height: 600,
                paddingLeft: "60px",
                //paddingRight: "70px",
            }}
        >
            <CardContent sx={{ maxHeight: 500, overflowY: "auto" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Grid container>
                    {/* Affichage des questions avec leur moyenne respective */}
                    {questions.map((question: any, index: any) => (
                        <Grid item sm={6}>
                            <QuestionCard
                                key={index}
                                question={question.question}
                                average={question.average}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}
export default function ReponsesEvaluationDetails() {
    const exampleQuestions = [
        { question: "Question 1", average: 4.2 },
        { question: "Question 2", average: 3.8 },
        { question: "Question 3", average: 2.5 },
        { question: "Question 4", average: 4.7 },
        { question: "Question 5", average: 3.9 },
    ]
    return (
        <>
            <div
            // style={{
            //     maxWidth: "90%",
            //     marginLeft: "150px",
            //     display: "flex",
            //     flexDirection: "column",
            //     alignItems: "center",
            // }}
            >
                <Swiper
                    effect={"cube"}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    pagination={true}
                    navigation={true}
                    modules={[EffectCube, Pagination, Navigation]}
                    className="mySwiper"
                    // effect={"coverflow"}
                    // grabCursor={true}
                    //centeredSlides={true}
                    // slidesPerView={"auto"}
                    // coverflowEffect={{
                    //     rotate: 50,
                    //     stretch: 0,
                    //     depth: 100,
                    //     modifier: 1,
                    //     slideShadows: true,
                    // }}
                    // pagination={true}
                    // modules={[EffectCoverflow, Pagination]}
                    // className="mySwiper"
                >
                    <SwiperSlide>
                        <RubriqueCard
                            title="Titre de la rubrique"
                            questions={exampleQuestions}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <RubriqueCard
                            title="Titre de la rubrique"
                            questions={exampleQuestions}
                        />{" "}
                    </SwiperSlide>
                    <SwiperSlide>
                        <RubriqueCard
                            title="Titre de la rubrique"
                            questions={exampleQuestions}
                        />{" "}
                    </SwiperSlide>
                    <SwiperSlide>
                        <RubriqueCard
                            title="Titre de la rubrique"
                            questions={exampleQuestions}
                        />{" "}
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}
