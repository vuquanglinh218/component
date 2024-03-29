import React, {ReactNode} from "react";
import Head from "next/head";
import {Container, withStyles, WithStyles} from "@material-ui/core";
import NavBar from "./NavBar";
import styles from "./styles";

export interface LayoutProps extends WithStyles<any> {
    children: ReactNode;
    username: string,
    title: string,
    marginLeftRight: boolean | true,
    hiddenContract: boolean
}

function Layout(props: LayoutProps) {
    const {classes, children, hiddenContract} = props;

    return (
        <div className={classes.backgroundDiv}>
            <Head>
                <title>{props.title || 'Sapo'}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="shortcut icon" href={"/static/favicon.png"} />
            </Head>

            <NavBar title={props.title} username={props.username} hiddenContract={hiddenContract}/>

            <Container className={props.marginLeftRight ? classes.mainContainer: classes.mainContainerMarginTopOnly} maxWidth={false}>
                {children}
            </Container>

        </div>
    )
}

export default withStyles(styles)(Layout);
