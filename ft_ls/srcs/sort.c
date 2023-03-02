/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sort.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/07 14:28:57 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/04 16:31:46 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

int	sort_cmp(t_dir *val1, t_dir *val2, t_ls *ls)
{
	int		reverse;
	int		test;

	reverse = 1;
	if (ls->args.flags.r == 1)
		reverse = -1;
	if (ls->args.flags.t == 1)
	{
		if ((val1->infos.st_mtimespec.tv_sec - \
					val2->infos.st_mtimespec.tv_sec) == 0)
			return (ft_strcmp(val2->name, val1->name) * reverse);
		return ((val1->infos.st_mtimespec.tv_sec - \
					val2->infos.st_mtimespec.tv_sec) * reverse);
	}
	test = ft_strcmp(val2->name, val1->name) * reverse;
	return (test);
}

void	get_stat(t_ls *ls, char *dirname)
{
	char	*path;
	char	*tmp;

	tmp = NULL;
	path = NULL;
	ls->dirlist = ls->dirlisthead;
	while (ls->dirlist)
	{
		path = ft_strjoin(dirname, "/");
		tmp = path;
		path = ft_strjoin(path, ls->dirlist->name);
		free(tmp);
		lstat(path, &ls->dirlist->infos);
		if (ls->dirlist->name[0] != '.')
			ls->total = ls->total + ls->dirlist->infos.st_blocks;
		ls->htotal = ls->htotal + ls->dirlist->infos.st_blocks;
		ls->dirlist = ls->dirlist->next;
		free(path);
	}
	ls->dirlist = ls->dirlisthead;
}

void	ft_sort_2(t_ls *ls, t_dir *tmp)
{
	tmp = (t_dir *)malloc(sizeof(t_dir));
	*tmp = *ls->dirlisthead;
	*ls->dirlisthead = *ls->dirlist;
	ls->dirlisthead->next = tmp->next;
	tmp->next = ls->dirlist->next;
	*ls->dirlist = *tmp;
	free(tmp);
}

void	ft_sort(t_ls *ls, char *dirname)
{
	t_dir	*tmp;
	t_dir	*head;

	tmp = NULL;
	head = NULL;
	if (ls->dirlisthead->type != 'z')
		get_stat(ls, dirname);
	ls->dirlist = ls->dirlisthead;
	head = ls->dirlisthead;
	while (ls->dirlist)
	{
		ls->dirlisthead = ls->dirlist;
		while (ls->dirlisthead)
		{
			if (sort_cmp(ls->dirlist, ls->dirlisthead, ls) < 0)
				ft_sort_2(ls, tmp);
			ls->dirlisthead = ls->dirlisthead->next;
		}
		ls->dirlist = ls->dirlist->next;
	}
	ls->dirlisthead = head;
	ls->dirlist = head;
}
