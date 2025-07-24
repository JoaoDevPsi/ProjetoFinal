from rest_framework import permissions

class IsAdminOrManagerOrSecurityAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated

        if request.user and request.user.is_authenticated:
            if request.user.is_staff:
                return True

            is_manager = request.user.groups.filter(name='Gerente').exists()
            is_security_admin = request.user.groups.filter(name='Administrador de Segurança').exists()

            if is_manager or is_security_admin:
                return True

        return False

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff