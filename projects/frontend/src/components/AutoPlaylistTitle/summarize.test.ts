import { OrchestraSummary, summarize } from './summarize';
import { darienzoLaborde } from './summarize.test.data';

it('Should summarize data as expected', () => {
  const expectation: OrchestraSummary = {
    orchestras: [`Juan D'Arienzo`],
    singer: ['Armando Laborde', 'Alberto Echagüe', 'Osvaldo Ramos'],
    years: ['late 30s', '40s', '50s', 'late 60s', '73'],
    genres: ['tango', 'milonga', 'vals'],
  };

  expect(summarize(darienzoLaborde)).toEqual(expectation);
});

