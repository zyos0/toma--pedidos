import Layout from '../../components/Layout/Layout';
import {useDispatch} from "react-redux";
import {PlatesActions} from "../../store/actions/plates";

const Plates = () => {
    const dispatch = useDispatch();
    dispatch(PlatesActions.getPlates())
    return (
        <Layout>
            <h1>Plates</h1>
        </Layout>
    );
};

export default Plates;
