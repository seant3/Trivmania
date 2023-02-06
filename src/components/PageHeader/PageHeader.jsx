import { Header, Segment, Image, Icon} from "semantic-ui-react";
import { Link } from "react-router-dom"

export default function PageHeader({handleLogout}){
    return (
        <Segment clearing style={{ maxHeight: 75 }}>
            <Header as='h4' floated="left">
                <Link to="/">
                     <Image src="https://imgur.com/gteinTi.png" size="mini"/>
                     
                </Link>
            </Header>
            <Header as="h4" floated="right">
                <Link to="/play">
                    Play Game
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="" onClick={handleLogout}>
                    Logout
                </Link>
            </Header>
            
        </Segment>
    )
}