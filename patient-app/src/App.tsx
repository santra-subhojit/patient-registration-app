import { useEffect, useState } from 'react';
import { PGliteWorker } from '@electric-sql/pglite/worker';
import PGWorker from './pglite-worker?worker';

const pg = new PGliteWorker(new PGWorker(), {
  dataDir: 'idb://patients',
});

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
};

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [sql, setSql] = useState('');
  const [sqlResult, setSqlResult] = useState<object[] | null>(null);
  const [message, setMessage] = useState('');

  const loadPatients = async () => {
    const res = await pg.query('SELECT * FROM patient ORDER BY id;');
    setPatients(res.rows as Patient[]);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const addPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pg.query(
        'INSERT INTO patient (name, age, gender) VALUES ($1, $2, $3);',
        [name, age || null, gender || null]
      );
      setMessage(`Patient ${name} added.`);
      setName('');
      setAge('');
      setGender('');
      await loadPatients();
    } catch (err) {
      setMessage(`Error: ${(err as Error).message}`);
    }
  };

  const runQuery = async () => {
    try {
      const result = await pg.query(sql);
      setSqlResult(result.rows as object[] ?? []);setSqlResult(result.rows as object[] ?? []);
      setMessage('');
    } catch (err) {
      setMessage(`Query error: ${(err as Error).message}`);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Register Patient</h2>
      <form onSubmit={addPatient}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" type="number" />
        <input value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" />
        <button type="submit">Add</button>
      </form>

      <h3>Patients</h3>
      <ul>
        {patients.map(p => (
          <li key={p.id}>
            {p.name} ({p.age}, {p.gender})
          </li>
        ))}
      </ul>

      <h3>Run SQL</h3>
      <textarea
        rows={3}
        style={{ width: '100%' }}
        value={sql}
        onChange={e => setSql(e.target.value)}
        placeholder="SELECT * FROM patient;"
      />
      <button onClick={runQuery}>Execute</button>

      {message && <p>{message}</p>}
      {sqlResult && (
        <pre>{JSON.stringify(sqlResult, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
