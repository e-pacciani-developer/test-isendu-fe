function authCheck(url: string, role: string): void {
  if (role === 'USER' && !adminRoutes.includes(url)) {
  }
}
