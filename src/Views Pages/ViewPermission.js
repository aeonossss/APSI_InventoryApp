import { useNavigate } from "react-router-dom";
import './App.js';

function ViewPermission(){
    const nav = useNavigate();
    const perms = (permitted) => {
        if (!permitted) {
            alert("You don't have permission to access this page.");
            nav('./dashboard');
        }
    }

    const permsRead = (role) =>{
        if (role == 'team lead') {
            nav('./TeamLeadView');
        }
        else if (role == 'csr'){
            nav('/CSRView')
        }
        else if (role == 'warehousestaff'){
            nav('./WarehouseStaff')
        }
    }
    return(
        <h1>test</h1>
    );
}