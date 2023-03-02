/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   dir_sort.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/04 15:05:54 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/04 20:00:04 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

int	t_zero(t_ls *ls, int i)
{
	if (ls->args.flags.r == 0 && ls->args.argdirsnms[i + 1] && \
			ft_strcmp(ls->args.argdirsnms[i], \
				ls->args.argdirsnms[i + 1]) > 0)
	{
		ft_swap(&ls->args.argdirsnms[i], \
				&ls->args.argdirsnms[i + 1]);
		i = 0;
	}
	else if (ls->args.flags.r == 1 && ls->args.argdirsnms[i + 1] && \
			ft_strcmp(ls->args.argdirsnms[i], \
				ls->args.argdirsnms[i + 1]) < 0)
	{
		ft_swap(&ls->args.argdirsnms[i], \
				&ls->args.argdirsnms[i + 1]);
		i = 0;
	}
	else
		i++;
	return (i);
}

int	t_one_2nd(t_ls *ls, int i, struct stat dir1, struct stat dir2)
{
	if (ls->args.flags.r == 0 && ls->args.argdirsnms[i + 1] && \
			dir1.st_mtimespec.tv_sec - dir2.st_mtimespec.tv_sec == 0)
	{
		if (ft_strcmp(ls->args.argdirsnms[i], \
					ls->args.argdirsnms[i + 1]) > 0)
			ft_swap(&ls->args.argdirsnms[i], \
					&ls->args.argdirsnms[i + 1]);
		i++;
	}
	else if (ls->args.flags.r == 1 && ls->args.argdirsnms[i + 1] && \
			dir1.st_mtimespec.tv_sec - dir2.st_mtimespec.tv_sec == 0)
	{
		if (ft_strcmp(ls->args.argdirsnms[i], \
					ls->args.argdirsnms[i + 1]) < 0)
			ft_swap(&ls->args.argdirsnms[i], \
					&ls->args.argdirsnms[i + 1]);
		i++;
	}
	else
		i++;
	return (i);
}

int	swap_init(t_ls *ls, int i)
{
	ft_swap(&ls->args.argdirsnms[i], &ls->args.argdirsnms[i + 1]);
	return (0);
}

void	sort_dirnms(t_ls *ls, int count)
{
	int			i;
	struct stat	dir1;
	struct stat	dir2;

	i = 0;
	while (i < count)
	{
		lstat(ls->args.argdirsnms[i], &dir1);
		if (ls->args.argdirsnms[i + 1])
			lstat(ls->args.argdirsnms[i + 1], &dir2);
		if (ls->args.flags.t == 0)
			i = t_zero(ls, i);
		else if (ls->args.flags.t == 1)
		{
			if (ls->args.flags.r == 0 && ls->args.argdirsnms[i + 1] && \
					dir1.st_mtimespec.tv_sec - dir2.st_mtimespec.tv_sec < 0)
				i = swap_init(ls, i);
			else if (ls->args.flags.r == 1 && ls->args.argdirsnms[i + 1] && \
					dir1.st_mtimespec.tv_sec - dir2.st_mtimespec.tv_sec > 0)
				i = swap_init(ls, i);
			else
				i = t_one_2nd(ls, i, dir1, dir2);
		}
	}
}
