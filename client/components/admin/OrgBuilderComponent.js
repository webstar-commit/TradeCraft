import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonsList from "../reusable/ButtonsList";
import Accordion from "../reusable/Accordion";
import Tree from 'react-d3-tree';
import TreeComponent from './org-builder/TreeComponent';
import AddNodeModal from './org-builder/AddNodeModal';
import OptionsModal from './org-builder/OptionsModal';
import { fetchOrganicOrg } from '../../actions/organicorg';
import { fetchOrganicPersonnel } from '../../actions/organicpersonnel';
// import '../../vendor/treant-js/Treant.css';
// import '../../vendor/treant-js/examples/custom-colored/custom-colored.css';
// import '../../vendor/treant-js/vendor/raphael.js';
// import '../../vendor/treant-js/Treant.js';

// import '../../../node_modules/treant-js/Treant.css';
// import '../../../node_modules/treant-js/examples/custom-colored/custom-colored.css';
// import '../../../node_modules/treant-js/vendor/raphael.js';
// import Treant from '../../../node_modules/treant-js/Treant.js';

let forceRemount = 0;
class OrgBuilderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAddNodeFormOpen: false,
      isOptionModalOpen: false,
      nodeId: null,
      branch:'1',
      callEdit:false,
      edit:'0',
      treeConfig: {
        orientation: 'vertical',
        svgSquare: {
          shape: 'rect',
          shapeProps: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            fill: 'yellow',
          },
        },
      },
      orgData: [
        {
          id: '1',
          UnitName: 'Larry Pickering',
          unitLogo: '/assets/img/admin/avatar.png',
          type:'Personnel',
          attributes: {
            Rank: 'Commanding General',
            Unit: '82nd Airborne Division',
          },
          children: [
            {
              id: '1.1',
              UnitName: 'Steve Lockwood',
              unitLogo: '/assets/img/admin/avatar.png',
              type:'Personnel',
              attributes: {
                Rank: 'Commander',
                Unit: '82nd Airborne Division',
              },
            },
            {
              id: '1.2',
              UnitName: 'Mike Kelly',
              unitLogo: '/assets/img/admin/avatar.png',
              type:'Personnel',
              attributes: {
                Rank: 'Commander',
                Unit: '82nd Airborne Division',
              },
            },
          ],
        },
      ],
    };
  }

  componentDidMount = () => {
  this.props.fetchOrganicOrg(this.state.branch);
  this.props.fetchOrganicPersonnel().then(()=> { 
    this.personnelChartView(); 
  });
  this.props.fetchDeployedOrg(this.state.branch);
  this.props.fetchDeployedPersonnel(this.state.branch);
  }

  renderSchema = () => {

  };

  openAddNodeForm = (parentNodeId) => {

    let { orgData } = this.state;
    this.setState({
      isAddNodeFormOpen: true,
    });

  }

  closeAddNodeForm = () => {
    this.setState({
      isAddNodeFormOpen: false,
    });
  }

  openOptionModal = (nodeData, e) => {
    console.log(nodeData);
    this.setState({
      isOptionModalOpen: true,
    });
  }

  closeOptionModal = () => {
    this.setState({
      isOptionModalOpen: false,
    });
  }

  deployedChartView = () => {
    
    const { allDeployedOrgs } = this.props;

    let orgData3 = [ allDeployedOrgs ];
   
    console.log(allDeployedOrgs);
    console.log(orgData3);

     this.setState({
       orgData: orgData3
     }, () => {console.log(this.state.orgData); forceRemount = forceRemount +1;});

  }

  deployedPersonnelChartView = () => {

    this.props.fetchDeployedPersonnel(this.state.branch).then(() => { 

      const { allDeployedPersonnels } = this.props;

      let orgData4 = allDeployedPersonnels;
     
      console.log(allDeployedPersonnels);
      console.log(orgData4);
  
       this.setState({
         orgData: orgData4
       }, () => {console.log(this.state.orgData); forceRemount = forceRemount +1;});
  
    });
    

  }

  orgChartView = () => {
    console.log("Here");
    const { allOrganicOrgs } = this.props;
    console.log(allOrganicOrgs);

    let orgData2 = [ allOrganicOrgs ];

    forceRemount = forceRemount +1;
   
     this.setState({
       orgData: orgData2
     });
   }

   setBranch = (id) => {
      this.setState ({
        branch:id
      }, () => { this.props.fetchOrganicOrg(this.state.branch).then( ()  => { this.orgChartView(); } ) })
   }

   personnelChartView = () => {
    
      const { allOrganicPersonnels } = this.props;
      console.log(allOrganicPersonnels);
      let orgPersonnel =  allOrganicPersonnels ;

      let orgSample2 = [ 
        {
          "PersonnelID": null,
          "FullName": null,
          "Rank": null,
          "RankAbbreviation": null,
          "DutyPosition": null,
          "PhotoPath": null,
          "AssignedUnitID": null,
          "Tier": 0,
          "children": [
            {
              "PersonnelID": "2f4b3c05-e612-4411-a9aa-e60628821837",
              "FullName": "mark koch",
              "Rank": "Chief Warrant Officer 3",
              "RankAbbreviation": "CW3",
              "DutyPosition": null,
              "PhotoPath": "/assets/img/admin/avatar.png",
              "AssignedUnitID": 15,
              "Tier": 1,
              "children": [
                {
                  "PersonnelID": "4e2634a4-99d1-4673-a095-cb3e47a5a189",
                  "FullName": "Nikhil Mahajan",
                  "Rank": null,
                  "RankAbbreviation": null,
                  "DutyPosition": "ISR Operations NCO",
                  "PhotoPath": "/assets/img/admin/avatar.png",
                  "AssignedUnitID": 15,
                  "Tier": 2,
                  "children": null
                },
                {
                  "PersonnelID": "64871d25-4940-4d4f-ae61-d590e65dfa52",
                  "FullName": "john Layfield Layfield",
                  "Rank": "Private",
                  "RankAbbreviation": "PVT",
                  "DutyPosition": null,
                  "PhotoPath": "/assets/img/admin/avatar.png",
                  "AssignedUnitID": 16,
                  "Tier": 2,
                  "children": [
                    {
                      "PersonnelID": "69eb4a99-c2b9-4fe5-b86b-cd01a9615b48",
                      "FullName": "Jhon  Leus",
                      "Rank": "Seaman",
                      "RankAbbreviation": "SN",
                      "DutyPosition": null,
                      "PhotoPath": "/assets/img/admin/avatar.png",
                      "AssignedUnitID": 16,
                      "Tier": 3,
                      "children": null
                    },
                    {
                      "PersonnelID": "edebbbd7-64f4-4321-9a64-40b601430ca8",
                      "FullName": "Fiona Gahlager",
                      "Rank": "General",
                      "RankAbbreviation": "GEN",
                      "DutyPosition": "ISR Tactical Controller",
                      "PhotoPath": "/assets/img/admin/avatar.png",
                      "AssignedUnitID": 19,
                      "Tier": 3,
                      "children": []
                    },
                    {
                      "PersonnelID": "c667a391-5cd3-4192-bd4a-65d38fe5ddd5",
                      "FullName": "Bill Snyder",
                      "Rank": null,
                      "RankAbbreviation": null,
                      "DutyPosition": "Chief, Analytical Control Element",
                      "PhotoPath": "/assets/img/admin/avatar.png",
                      "AssignedUnitID": 17,
                      "Tier": 3,
                      "children": [
                        {
                          "PersonnelID": "7af16e1f-04c5-4275-8e56-de5448ac8a00",
                          "FullName": "bORIS J",
                          "Rank": "Private First Class",
                          "RankAbbreviation": "PFC",
                          "DutyPosition": "Collection Planner",
                          "PhotoPath": "/assets/img/admin/avatar.png",
                          "AssignedUnitID": 17,
                          "Tier": 4,
                          "children": null
                        }
                      ]
                    },
                    {
                      "PersonnelID": "d613a28a-b609-46f8-acd2-0b52720baa17",
                      "FullName": "Hong ",
                      "Rank": null,
                      "RankAbbreviation": null,
                      "DutyPosition": null,
                      "PhotoPath": "map2.png",
                      "AssignedUnitID": 18,
                      "Tier": 3,
                      "children": [
                        {
                          "PersonnelID": "e6125f8b-4626-4550-a7af-25ce07fe0941",
                          "FullName": "jon shane",
                          "Rank": "Master Sergeant",
                          "RankAbbreviation": "MSGT",
                          "DutyPosition": null,
                          "PhotoPath": "/assets/img/admin/avatar.png",
                          "AssignedUnitID": 18,
                          "Tier": 4,
                          "children": null
                        }
                      ]
                    }
                  ]
                },
                {
                  "PersonnelID": "959658a1-6fe0-4d7c-bba6-4680d13a818e",
                  "FullName": "Mike Martin",
                  "Rank": null,
                  "RankAbbreviation": null,
                  "DutyPosition": null,
                  "PhotoPath": "/assets/img/admin/avatar.png",
                  "AssignedUnitID": 56,
                  "Tier": 2,
                  "children": []
                }
              ]
            }
          ]
        }
       ];

       forceRemount = forceRemount +1;
   
     this.setState({
       orgData: orgPersonnel,       
     });
   }



onSelecOption = (nodeId, name) => {

}

fetchPersonnels = (searchUnit) => {
  this.props.fetchPersonnelsByFilter(searchUnit).then(() => {console.log("DoneFetch")});
}

chartData = ()=> {

  var config = {
    container: "#custom-colored",
    nodeAlign: "BOTTOM",
    connectors: {
      type: 'step'
    },
    node: {
      HTMLclass: 'nodeExample1'
    }
  },
  ceo = {
    text: {
      name: "Mark Hill",
      title: "Chief executive officer",
      contact: "Tel: 01 213 123 134",
    },
    image: "/assets/img/admin/avatar.png"
  },

  cto = {
    parent: ceo,
    text:{
      name: "Joe Linux",
      title: "Chief Technology Officer",
    },
    image: "/assets/img/admin/avatar.png"
  },
  cbo = {
    parent: ceo,
    connectors: {
      style: {
        color: 'white',
        backgroundColor: 'white',
      }
    },
    childrenDropLevel: 2,
    text:{
      name: "Linda May",
      title: "Chief Business Officer",
    },
    image: "/assets/img/admin/avatar.png"
  },
  cdo = {
    parent: ceo,
    text:{
      name: "John Green",
      title: "Chief accounting officer",
      contact: "Tel: 01 213 123 134",
    },
    image: "/assets/img/admin/avatar.png"
  },
  cio = {
    parent: cto,
    text:{
      name: "Ron Blomquist",
      title: "Chief Information Security Officer"
    },
    image: "/assets/img/admin/avatar.png"
  },
  ciso = {
    parent: cto,
    text:{
      name: "Michael Rubin",
      title: "Chief Innovation Officer",
      contact: "we@aregreat.com"
    },
    image: "/assets/img/admin/avatar.png"
  },
  cio2 = {
    parent: cdo,
    text:{
      name: "Erica Reel",
      title: "Chief Customer Officer"
    },
    image: "/assets/img/admin/avatar.png"
  },
  ciso2 = {
    parent: cbo,
    text:{
      name: "Alice Lopez",
      title: "Chief Communications Officer"
    },
    image: "/assets/img/admin/avatar.png"
  },
  ciso3 = {
    parent: cbo,
    text:{
      name: "Mary Johnson",
      title: "Chief Brand Officer"
    },
    image: "/assets/img/admin/avatar.png"
  },
  ciso4 = {
    parent: cbo,
    text:{
      name: "Kirk Douglas",
      title: "Chief Business Development Officer"
    },
    image: "/assets/img/admin/avatar.png"
  },

  chart_config = [
    config,
    ceo,cto,cbo,
    cdo,cio,ciso,
    cio2,ciso2,ciso3,ciso4
  ];

setTimeout(() => {
  new Treant(chart_config)
}, 0);

}

fetchUnits = (edit) => 
{
  this.props.fetchUnitById(edit);
}

func = (id) => 
{
  console.log("Call Func Called");
  this.setState({
      callEdit:true,
      edit:id
  });
}

stopCall = () => 
{
  this.setState({
    callEdit:false
});
}

testfunc = (nodeData) => {
  console.log(nodeData.unitID);
}


render() {

  const { translations } = this.props;
  const { allOrganicOrgs } = this.props;
  const { allOrganicPersonnels } = this.props;
  const { listOrganicPersonnels } = this.props;

  console.log(listOrganicPersonnels);

  return (
    <div>
      <div className="row personnel" >
        <div className="header-line">
          <img src="/assets/img/admin/personnel_1.png" alt=""/>
          <div className="header-text">
            {translations["organisation builder"]}
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
        </div>
        
      </div>
      <div >
        {this.state.isAddNodeFormOpen ?
          <AddNodeModal onClose={this.closeAddNodeForm} translations = {translations}/>
          : null
        }
      </div>
      <div >
        {this.state.isOptionModalOpen ?
          <OptionsModal onSelect={this.onSelecOption} nodeId={this.state.nodeId} onClose={this.closeOptionModal} translations = {translations}/>
          : null
        }
      </div>

      <div className="row personnel" >
       <div className="col-md-3"> 
          { <Accordion orgChart={this.orgChartView} personnelChart={this.personnelChartView} deployedChart={this.deployedChartView} deployedPersonneChart={this.deployedPersonnelChartView} setBranch={this.setBranch} fetchPersonnelsByFilter={this.fetchPersonnels} listPersonnel={listOrganicPersonnels} fetchUnitById={this.fetchUnits} oneUnit={this.props.oneUnit} callEdit={this.state.callEdit} edit={this.state.edit} stopCall={this.stopCall}/> }
       </div>   
       <div className="col-md-9"> 
{/*             <Tree data={this.state.orgData} orientation={this.state.treeConfig.orientation} nodeSvgShape= {this.state.treeConfig.svgSquare}/> */}
          <TreeComponent data={this.state.orgData} forceRemount={forceRemount} collapsible={true} callfunc={this.func} pathFunc="straight" />
        </div>  
        </div>
      </div>
  );
}
}

OrgBuilderComponent.propTypes = {
  children: PropTypes.element,

};

export default OrgBuilderComponent;
