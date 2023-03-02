/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ls.c                                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/07 14:29:32 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/05 13:12:52 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	check_file(t_ls *ls, char *dirname)
{
	struct stat	check;

	ls->err_status = lstat(dirname, &check);
	if (ls->err_status < 0)
	{
		ft_putstr("ft_ls: ");
		ft_putstr(dirname);
		ft_putstr(": ");
		ft_putendl(strerror(errno));
		return ;
	}
	ls->dirlist = (t_dir *)malloc(sizeof(t_dir));
	ls->dirlisthead = ls->dirlist;
	ls->dirlist->name = ft_strdup(dirname);
	ls->dirlisthead->type = 'z';
	ls->nline = 1;
	ls->dirlist->next = NULL;
}

void	ft_ls_two(t_ls *ls, int i)
{
	while (ls->entity)
	{
		if (i == 0)
		{
			ls->dirlist = (t_dir *)malloc(sizeof(t_dir));
			ls->dirlisthead = ls->dirlist;
		}
		ls->dirlist->name = ft_strdup(ls->entity->d_name);
		ls->dirlist->type = ls->entity->d_type;
		ls->entity = readdir(ls->dir);
		if (ls->entity)
		{
			ls->dirlist->next = (t_dir *)malloc(sizeof(t_dir));
			ls->dirlist = ls->dirlist->next;
			ls->dirlist->next = NULL;
		}
		else
			ls->dirlist->next = NULL;
		i = 1;
	}
}

int	ft_ls(char *dirname, t_ls *ls)
{
	int				i;
	struct passwd	*pw;

	i = 0;
	pw = NULL;
	pw = getpwuid(getuid());
	if (ft_strcmp(dirname, "~") == 0)
		ls->dir = opendir(pw->pw_dir);
	else
		ls->dir = opendir(dirname);
	if (ls->dir == NULL)
	{
		check_file(ls, dirname);
		return (0);
	}
	ls->entity = readdir(ls->dir);
	ft_ls_two(ls, i);
	ls->dirlist = ls->dirlisthead;
	return (1);
}
