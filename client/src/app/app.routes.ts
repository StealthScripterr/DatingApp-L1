import { GuardsCheckStart, Routes } from '@angular/router';
import { Lists } from '../features/lists/lists';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetail } from '../features/members/member-detail/member-detail';
import { Messages } from '../features/messages/messages';
import { Home } from '../features/home/home';
import { authGuard } from '../core/guards/auth-guard';


export const routes: Routes = [
    {path: '', component: Home},
    {
        path:'',
        runGuardsAndResolvers : 'always',
        canActivate : [authGuard],
        children :[
            {path: 'members', component: MemberList},
            {path: 'members/:id', component: MemberDetail},
            {path: 'lists', component: Lists},
            {path: 'messages', component: Messages},
        ]
    },

    {path : '**', component: Home}
];
