import { redirect } from 'react-router';
import type { Route } from './+types/playground';

export async function loader(_: Route.LoaderArgs) {
  return redirect('/editor', { headers: new Headers(), status: 301 });
}
