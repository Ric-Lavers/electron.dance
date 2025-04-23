import Document, { Html, Head, NextScript, Main } from 'next/document'



export default class MyDocument extends Document {

    render(){
        return (
            <Html>
                <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta name="viewport" content="width-device-width,initial-scale=1.0"/>
                </Head>
                <Main/>
                <NextScript/>
            </Html>
        )
    }
}