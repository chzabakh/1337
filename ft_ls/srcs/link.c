/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   link.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/05 14:05:26 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/05 14:36:39 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	link_one(t_ls *fake_ls)
{
	if (fake_ls->dirlisthead->name)
		free(fake_ls->dirlisthead->name);
	if (fake_ls->dirlisthead)
		free(fake_ls->dirlisthead);
	if (fake_ls)
		free(fake_ls);
}

void	link_two(t_ls *fake_ls, unsigned char type)
{
	if (type == 'z')
		print_ell(fake_ls);
	if (fake_ls->dirlisthead->name)
		free(fake_ls->dirlisthead->name);
	if (fake_ls->dirlisthead)
		free(fake_ls->dirlisthead);
	if (fake_ls)
		free(fake_ls);
}

void	link_three(t_ls *fake_ls)
{
	if (fake_ls->dirlisthead->name)
		free(fake_ls->dirlisthead->name);
	if (fake_ls->dirlisthead)
		free(fake_ls->dirlisthead);
	if (fake_ls)
		free(fake_ls);
}

int	ft_tricky_link(char *dirname, t_flags flags, unsigned char type)
{
	t_ls	*fake_ls;
	int		i;

	fake_ls = (t_ls *)malloc(sizeof(t_ls));
	i = ft_strlen(dirname);
	fake_ls->dirlisthead = NULL;
	fake_ls->dirlisthead = (t_dir *)malloc(sizeof(t_dir));
	fake_ls->dirlisthead->name = ft_GetLastWord(dirname);
	fake_ls->dirlisthead->next = NULL;
	fake_ls->args.flags = flags;
	if (dirname[i - 1] == '/')
	{
		link_one(fake_ls);
		return (0);
	}
	lstat(dirname, &fake_ls->dirlisthead->infos);
	if (!(S_ISLNK(fake_ls->dirlisthead->infos.st_mode)))
	{
		link_two(fake_ls, type);
		return (0);
	}
	print_ell(fake_ls);
	ft_check_link(fake_ls, dirname, 1);
	link_three(fake_ls);
	return (1);
}
