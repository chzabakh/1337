/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   flags_check.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/07 14:29:15 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/04 15:13:22 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	flags_check(char *argv, t_ls *ls)
{
	int		i;

	i = 1;
	while (argv[i])
	{
		if (argv[i] == 'l')
			ls->args.flags.l = 1;
		else if (argv[i] == 'a')
			ls->args.flags.a = 1;
		else if (argv[i] == 'r')
			ls->args.flags.r = 1;
		else if (argv[i] == 't')
			ls->args.flags.t = 1;
		else
		{
			ft_putstr("ft_ls: illegal option -- ");
			ft_putchar(argv[i]);
			ft_putchar('\n');
			ft_putstr("usage: ft_ls [-ABCFGHLOPRSTUWabcdefghiklmnopqrstuwx1]");
			ft_putendl(" [file ...]");
			exit(0);
		}
		i++;
	}
}
