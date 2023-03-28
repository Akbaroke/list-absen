import * as React from 'react';
import axios from 'axios';

function App() {
  const [dataMahasiswa, setDataMahasiswa] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.get('https://api.steinhq.com/v1/storages/64224443d27cdd09f0eb1eac/21a3');
      setDataMahasiswa(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const cekLabelHadir = (data) => {
    return data === 'M' ? <div className="badge badge-accent">hadir</div> : <div className="badge badge-secondary">tidak hadir</div>;
  };

  return (
    <div className="p-10 text-center">
      <h1 className="font-bold text-xl mb-5">Data Absensi Mahasiswa TI.21.A3</h1>
      {isLoading ? (
        <div className="mt-20">
          <p>Loading...</p>
          <progress className="progress w-56 bg-gray-500"></progress>
        </div>
      ) : (
        <div className="overflow-x-auto p-1 bg-[#eaeaea]/20 rounded-lg w-max m-auto">
          <table className="table max-w-lg">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Nim</th>
                <th>Pert.1</th>
                <th>Pert.2</th>
                <th>Pert.3</th>
              </tr>
            </thead>
            <tbody>
              {dataMahasiswa.map((data) => {
                return (
                  <tr key={data.NO}>
                    <th>{data.NO}</th>
                    <td>{data.NaMa}</td>
                    <td>{data.NIM}</td>
                    <td>{cekLabelHadir(data['1'])}</td>
                    <td>{cekLabelHadir(data['2'])}</td>
                    <td>{cekLabelHadir(data['3'])}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
