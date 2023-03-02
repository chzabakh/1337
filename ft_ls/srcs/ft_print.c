/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/07 14:28:57 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/05 15:24:04 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	print_l1(t_ls *ls, struct passwd *pwd, struct group *grp, mode_t mode)
{
	if (ft_strlen(pwd->pw_name) <= 7)
		ft_putstr("\t   ");
	ft_putstr(grp->gr_name);
	if (ft_strlen(grp->gr_name) <= 4)
		ft_putstr("\t\t\t");
	else if (ft_strlen(grp->gr_name) <= 10)
		ft_putstr("\t\t");
	else if (ft_strlen(grp->gr_name) <= 14)
		ft_putstr("\t");
	else
		ft_putstr("\t\t");
	if ((S_ISBLK(mode)) || (S_ISCHR(mode)))
		ft_minor_major(ls->dirlisthead->infos.st_rdev);
	else
		ft_putnbr(ls->dirlisthead->infos.st_size);
	if (ls->dirlisthead->infos.st_size < 9999999)
		ft_putstr("\t\t");
	else if (ls->dirlisthead->infos.st_size < 99999999)
		ft_putstr("\t");
}

void	print_ell(t_ls *ls)
{
	struct passwd	*pwd;
	struct group	*grp;
	mode_t			mode;

	pwd = NULL;
	grp = NULL;
	if (errno == 13)
		return ;
	mode = ls->dirlisthead->infos.st_mode;
	ft_permissions(mode);
	ft_putstr("     ");
	pwd = getpwuid(ls->dirlisthead->infos.st_uid);
	grp = getgrgid(ls->dirlisthead->infos.st_gid);
	ft_putnbr(ls->dirlisthead->infos.st_nlink);
	ft_putstr("\t");
	ft_putstr(pwd->pw_name);
	ft_putstr("   ");
	print_l1(ls, pwd, grp, mode);
	ft_date(ls->dirlisthead->infos.st_mtimespec.tv_sec);
}

void	ft_print_one(t_ls *ls)
{
	if (ls->dirlisthead->type != 'z')
	{
		ft_putstr("total ");
		if (ls->args.flags.a == 1)
			ft_putnbr(ls->htotal);
		else if (ls->args.flags.a == 0)
			ft_putnbr(ls->total);
		ft_putchar('\n');
	}
}

void	ft_print(t_ls *ls, char *dirname)
{
	ft_sort(ls, dirname);
	if (ls->args.flags.l)
		if (ft_tricky_link(dirname, ls->args.flags, ls->dirlisthead->type))
			return ;
	if (ls->args.flags.l == 1)
		ft_print_one(ls);
	while (ls->dirlisthead)
	{
		if (ls->args.flags.l == 1)
		{
			if (!(ls->args.flags.a == 0 && ls->dirlisthead->name[0] == '.') \
					&& ls->dirlisthead->type != 'z')
				print_ell(ls);
		}
		if (ls->args.flags.a == 1)
			ft_check_link(ls, dirname, 0);
		if (ls->args.flags.a == 0 && ls->dirlisthead->name[0] != '.')
			ft_check_link(ls, dirname, 0);
		ls->dirlisthead = ls->dirlisthead->next;
	}
	ls->dirlisthead = ls->dirlist;
}
