import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "./shared/authentication.service";
import {inject} from "@angular/core";
export const canNavigateToAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    window.alert(
      "Sie müssen Sich einloggen, um den Administrationsbereich zu betreten"
    );
    console.log(state);
    router.navigate(["../"]);
    return false;
  }
};
