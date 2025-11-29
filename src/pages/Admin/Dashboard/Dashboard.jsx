import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../../store/actions/AdminActions/AdminAction';
import './Dashboard.scss'
import {ReactComponent as Product} from '../../../assets/images/product.svg'
import {ReactComponent as Order} from '../../../assets/images/order.svg'
import {ReactComponent as Money} from '../../../assets/images/money.svg'
import {ReactComponent as Users} from '../../../assets/images/users.svg'
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, pieArcLabelClasses, PieChart } from '@mui/x-charts';
import { generateDailyData, generateMonthlyData } from '../../../utils/helpers/helper';
import { CircularProgress, Skeleton } from '@mui/material';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
    const {loading, data} =  useSelector(state=> state.dashboardReducer)
    const dispatch = useDispatch();
  
  const stats = [
    { title: 'Total Products', color: 'primary', key: 'total_products' , icon: <Product/>},
    { title: 'Total Orders', color: 'success', key: 'total_users', icon:<Order fill='red' /> },
    { title: 'Total Users', color: 'info', key: 'total_orders', icon:<Users stroke='#3ccd16' /> },
    { title: 'Revenue', color: 'warning', key: 'total_revenue', icon:<Money color={'#f9d745'} /> }
  ];

  useEffect(()=>{
    dispatch(getDashboardData())
  }, [])

  

  return (
    <div className='dashboard'>
      <div className=" d-flex bg-light opacity-75 position-sticky top-0 justify-content-between align-items-center shadow-sm p-4 py-3 mb-4" style={{zIndex: 999}}>
        <h4 className="mb-0 d-flex align-items-center ms-4 ms-lg-0">
            Dashboard
          </h4>
        
      </div>
      <div className="content  continer-fluid px-2 px-lg-4">
        <div className="row mb-2">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-6 col-xl-3 mb-4">
              {
                loading?
                <Skeleton variant="rounded"  width={'100%'} height={84} />
                :
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="card-title text-muted mb-2">{stat.title}</h6>
                        <h5 className="mb-0 fw-bold">{data?.[stat.key]}</h5>
                      </div>
                      <div className={`fs-2`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="rounded shadow ">
              <BarChart
              loading={loading && !data}
                height={300}
                series={[
                  { data: data?.revenueByCategory?.map(item=> item.revenue) || [], label: 'Revenue', id: 'pvId', minBarSize: 5},
                ]}
                xAxis={[{ data: data?.revenueByCategory?.map(item=> item.category) || [] }]}
                yAxis={[{ width: 50 }]}
              />
            </div>
          </div>
          <div className="div col-12 col-lg-6 mt-4 mt-lg-0">
            <div className="rounded shadow w-100 h-100 p-3">
              <PieChart
                loading={loading && !data}
                series={[{ 
                  innerRadius: 50, 
                  outerRadius: 100, 
                  data: data?.statusCount ? Object.entries(data?.statusCount).map(([label, value], index) => ({
                    label,
                    value,
                    color: colors[index % colors.length], // cycle through colors
                  })) : [],
                  cornerRadius: 5,
                  paddingAngle: 2,
                  arcLabel: 'value' 
                }]}
                {...{
                  margin: { right: 5 },
                  height: 300,
                }}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    color: '#fff',
                  },
                }}
              />
          </div>
          </div>
        </div>
        <div className="row">
          <div className="div col-12 col-lg-6  mt-4">
            <div className="rounded shadow">              
              <LineChart
                loading={loading && !data}
                height={300}
                series={[
                  { data: generateDailyData(data?.salesOverTime?.daily)?.map(item=> item.revenue), label: 'Revenue', color: "#FFBB28", shape: 'cross' },
                ]}
                xAxis={[
                  {
                    data: generateDailyData(data?.salesOverTime?.daily)?.map(item => new Date(item.date)), // convert to Date objects
                    scaleType: 'time', // important for daily timeline
                    valueFormatter: (date) =>  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // e.g. Aug 23
                    tickLabelStyle: {
                      angle: -90,         // use degrees (try -45, -60, or -90)
                      textAnchor: "end",
                      fontSize: 12,
                    },
                    height: 50,
                  },
                  
                ]}
                yAxis={[{ width: 60 }]}
              />
            </div>
          </div>
          <div className="div col-12 col-lg-6  mt-4 mb-4">
            <div className="rounded shadow">
              <LineChart
                loading={loading && !data}
                height={300}
                series={[
                  { data: generateMonthlyData(data?.salesOverTime?.monthly), label: 'Revenue', color: "green",},
                ]}
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    tickLabelStyle: {
                      angle: -90,         // use degrees (try -45, -60, or -90)
                      textAnchor: "end",
                      fontSize: 12,
                    },
                    height: 40,
                  },
                  
                ]}
                yAxis={[{ width: 60 }]}
                title='Monthly Revenue Chart'
                slotProps={{
                  title: {
                    children: "Monthly Revenue Chart", // your chart title
                    style: {
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "center",
                    },
                  },
                }}
              />
            </div>
          </div>

        </div>
      </div>
      {/* Stats Cards */}
    </div>
  );
};

export default Dashboard;